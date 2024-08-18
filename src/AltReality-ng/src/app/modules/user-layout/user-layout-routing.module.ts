import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';

const routes: Routes = [
  {
    path: 'characters',
    component: UserLayoutComponent,
    loadChildren: () => import('../../modules/characters/characters.module').then(m => m.CharactersModule)
  },
  {
    path: 'teams',
    component: UserLayoutComponent,
    loadChildren: () => import('../../modules/teams/teams.module').then(m => m.TeamsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
