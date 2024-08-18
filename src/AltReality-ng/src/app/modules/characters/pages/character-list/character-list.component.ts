import { Component, OnInit } from '@angular/core';
import { CharacterModel } from 'src/app/core/alt-reality-api/character/models/character-model';
import { constants } from 'src/app/shared/classes/constants';
import { CharacterListViewModel } from './character-list-view-model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BattleNetProfile } from 'src/app/core/alt-reality-api/profile/models/battle-net-profile';
import { CharacterBase } from 'src/app/core/alt-reality-api/character/models/character-base';
import { Router } from '@angular/router';
import { AltRealityApiService } from 'src/app/core/alt-reality-api/alt-reality-api.service';
import { ProgressSpinnerService } from '../../../../core/progress-indicator/progress-spinner.service';
import { ProgressDetailsModel } from '../../../../core/progress-indicator/models/progress-details.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  characterStore: CharacterModel[] = [];
  vm: CharacterListViewModel = new CharacterListViewModel();

  constructor(
    private router: Router,
    private api: AltRealityApiService,
    private progressSpinner: ProgressSpinnerService) {}

  ngOnInit(): void {
    this.vm.view = localStorage.getItem(constants.storageKeys.characterView) || 'list';
    this.vm.sortSelections = JSON.parse(localStorage.getItem(constants.storageKeys.characterSort)) || [];
    if (this.vm.sortSelections.length === 0) {
      this.addSort("lastLogin");
      this.addSort("lastLogin");
    }
    this.vm.showFilterPanel = false;
    this.vm.levelFilterSelections = JSON.parse(localStorage.getItem(constants.storageKeys.characterLevelFilter));

    this.progressSpinner.startSpinner(<ProgressDetailsModel>{
      id: 'bnetProf',
      message: 'Refreshing BattleNet Profile...'
    });
    this.api.profile.getBattleNetProfile().subscribe(
      (profile: BattleNetProfile) => {
        this.progressSpinner.stopSpinner('bnetProf');
        this.progressSpinner.startSpinner(<ProgressDetailsModel>{
          id: 'toons',
          message: 'Refreshing Character Data...'
        });
        let baseCharacters: CharacterBase[] = [];
        profile.wowAccounts.forEach(w => {
          w.characters.forEach(c => baseCharacters.push(c))
        });
        baseCharacters.forEach(b => {
          this.api.character.getCharacter(b.realm.slug, b.name).subscribe(
            (character: CharacterModel) => {
              this.characterStore.push(character);
              this.vm.characters.push(character);
              this.vm.filterForm = this.buildFilterForm();
              this.applySort();
              if (this.characterStore.length === baseCharacters.length) {
                this.progressSpinner.stopSpinner('toons');
              }
            },
            (err) => {
              this.progressSpinner.stopSpinner('toons');
            });
        });
      },
      (err) => {
        this.progressSpinner.stopSpinner('bnetProf');
      }
    );
  }

  setView(view: string): void {
    this.vm.view = view;
    localStorage.setItem(constants.storageKeys.characterView, view);
  }

  addSort(column: string) {
    let sortElement = this.vm.sortSelections.find(s => s.column === column);
    if (sortElement !== undefined) {
      const index = this.vm.sortSelections.map(s => s.column).indexOf(column);
      if (index === this.vm.sortSelections.length-1) {
        this.vm.sortSelections[index].direction = !this.vm.sortSelections[index].direction;
      } else {
        this.vm.sortSelections = this.vm.sortSelections.filter(s => s.column !== column);
        this.vm.sortSelections.push({column: column, direction: true});
      }
    } else {
      this.vm.sortSelections.push({column: column, direction: true});
    }
    localStorage.setItem(constants.storageKeys.characterSort, JSON.stringify(this.vm.sortSelections));
    this.applySort();
  }

  toggleFilterPanel(): void {
    this.vm.showFilterPanel = !this.vm.showFilterPanel;
  }

  navigateToCharacter(realm: string, name: string) {
    this.router.navigate([`/characters/${realm}/${name}`]);
  }

  private applySort(): void {
    this.vm.characters.sort((a, b) => {
      let i = this.vm.sortSelections.length-1, result = 0;
      while (i >= 0 && result === 0) {
        const column = this.vm.sortSelections[i].column;
        result = this.compare(this.parseSortColumn(a, column), this.parseSortColumn(b, column), this.vm.sortSelections[i].direction);
        i--;
      }
      return result;
    });
  }

  private compare(a: any, b: any, isAsc: boolean): number {
    if (a == null && b == null) { return 0; }
    if (a != null && b == null) { return this.sortEval(!isAsc); }
    if (a == null && b != null) { return this.sortEval(isAsc); }
    if (typeof(a) === 'string') { a = a.trim().toLowerCase(); }
    if (typeof(b) === 'string') { b = b.trim().toLowerCase(); }

    return (a < b ? -1 : (a > b ? 1 : 0)) * this.sortEval(isAsc);
  }

  private sortEval(isAsc: boolean): number {
    return (isAsc ? 1 : -1);
  }

  private parseSortColumn(obj: any, column: string): string | number {
    const keys = column.split('.');
    let result = obj;
    keys.forEach(k => {
      if (result) {
        result = result[k];
      }
    });
    return result;
  }

  applyFilter(event: any): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('event: ' + JSON.stringify(event));
  }

  private buildFilterForm(): FormGroup {
    this.vm.levelFilterOptions = [...new Set(this.vm.characters.map(c => c.level))];
    this.vm.levelFilterOptions.sort((a,b) => this.compare(a,b,false));
    if (this.vm.levelFilterSelections === null) {
      this.vm.levelFilterSelections = this.vm.levelFilterOptions;
    }
    // this.vm.characters = this.characterStore.filter(character => this.vm.levelFilterSelections.includes(character.level));
    this.vm.isLevelFilterActive = true;
    const levelControls = this.vm.levelFilterOptions.map(o => {
      return new FormControl(this.vm.levelFilterSelections.includes(o));
    });

    let form = new FormGroup({
      levels: new FormArray(levelControls)
    });

    return form;
  }
}
