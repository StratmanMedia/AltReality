import { Component, OnInit } from '@angular/core';
import { AltRealityApiService } from 'src/app/core/alt-reality-api/alt-reality-api.service';
import { TeamModel } from 'src/app/core/alt-reality-api/team/models/team-model';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  leaderTeamStore: TeamModel[] = [];
  memberTeamStore: TeamModel[] = [];

  constructor(private api: AltRealityApiService) { }

  ngOnInit(): void {
    this.api.team.getManyLeaderTeams().subscribe(
      (teams: TeamModel[]) => {
        this.leaderTeamStore = teams;
      });
  }

}
