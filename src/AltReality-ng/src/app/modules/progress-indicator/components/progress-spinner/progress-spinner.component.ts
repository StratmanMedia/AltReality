import { Component, OnInit } from '@angular/core';
import { ProgressDetailsModel } from '../../../../core/progress-indicator/models/progress-details.model';
import { ProgressSpinnerService } from '../../../../core/progress-indicator/progress-spinner.service';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css']
})
export class ProgressSpinnerComponent implements OnInit {

  showSpinner: boolean;
  spinnerDetails: ProgressDetailsModel;

  constructor(private spinner: ProgressSpinnerService) {}

  ngOnInit(): void {
    this.spinner.showSpinner().subscribe(
      (show: boolean) => {
        this.showSpinner = show;
        if (show) {
          this.spinnerDetails = this.spinner.getDetails();
        }
      }
    );
  }
}
