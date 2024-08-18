import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AltRealityApiService } from 'src/app/core/alt-reality-api/alt-reality-api.service';
import { TeamModel } from 'src/app/core/alt-reality-api/team/models/team-model';
import { constants } from 'src/app/shared/classes/constants';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-create-team-form',
  templateUrl: './create-team-form.component.html',
  styleUrls: ['./create-team-form.component.css']
})
export class CreateTeamFormComponent implements OnInit, AfterViewInit {

  @ViewChild('createTeamModale') modalEl: ElementRef<HTMLElement>;
  modal: Modal;
  
  constructor(
    private api: AltRealityApiService,
    private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    var modalEl = document.getElementById('createTeamModal');
    // this.modal = Modal.getInstance(modalEl);
  }

  onSubmitTeam(): void {
    const team = <TeamModel>{
      name: 'Hard Coded'
    };
    this.api.team.createTeam(team).subscribe(
      () => {
        console.log('hiding?');
        // this.modal.toggle();
      });
  }
}
