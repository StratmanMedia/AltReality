import { FormGroup } from '@angular/forms';
import { CharacterModel } from '../../../../core/alt-reality-api/character/models/character-model';
import { Sort } from '../../../../shared/classes/sort';

export class CharacterListViewModel {
  characters: CharacterModel[] = [];
  view: string;
  sortSelections: Sort[] = [];
  showFilterPanel: boolean;
  filterForm: FormGroup
  isLevelFilterActive: boolean;
  levelFilterOptions: number[] = [];
  levelFilterSelections: number[] = [];
}