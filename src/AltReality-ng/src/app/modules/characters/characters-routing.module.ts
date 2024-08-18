import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { CharacterListComponent } from './pages/character-list/character-list.component';

const routes: Routes = [
  { path: '', component: CharacterListComponent },
  { path: ':realm/:name', component: CharacterDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
