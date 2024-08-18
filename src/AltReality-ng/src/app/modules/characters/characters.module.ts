import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { ProgressIndicatorModule } from '../progress-indicator/progress-indicator.module';

@NgModule({
  declarations: [
    CharacterListComponent,
    CharacterDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProgressIndicatorModule,
    CharactersRoutingModule
  ]
})
export class CharactersModule { }
