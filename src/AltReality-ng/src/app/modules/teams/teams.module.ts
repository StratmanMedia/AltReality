import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamListComponent } from './pages/team-list/team-list.component';
import { CreateTeamFormComponent } from './pages/create-team-form/create-team-form.component';


@NgModule({
  declarations: [TeamListComponent, CreateTeamFormComponent],
  imports: [
    CommonModule,
    TeamsRoutingModule
  ]
})
export class TeamsModule { }
