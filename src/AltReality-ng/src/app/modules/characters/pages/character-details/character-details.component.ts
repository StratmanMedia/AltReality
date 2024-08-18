import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AltRealityApiService } from 'src/app/core/alt-reality-api/alt-reality-api.service';
import { CharacterModel } from 'src/app/core/alt-reality-api/character/models/character-model';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  character: CharacterModel;

  constructor(
    private route: ActivatedRoute,
    private apiService: AltRealityApiService) {

    const realmSlug = this.route.snapshot.paramMap.get('realm');
    const characterName = this.route.snapshot.paramMap.get('name');
    this.character = new CharacterModel();
    this.apiService.character.getCharacter(realmSlug, characterName).subscribe(
      (res) => {
        this.character = res;
      }
    )
  }

  ngOnInit(): void {
  }

}
