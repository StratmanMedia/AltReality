import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProgressDetailsModel } from './models/progress-details.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressSpinnerService {
  private showSpinnerSubject = new BehaviorSubject<boolean>(false);
  private spinnerStack: ProgressDetailsModel[] = [];
  
  constructor() {}

  showSpinner(): Observable<boolean> {
    return this.showSpinnerSubject.asObservable();
  }

  getDetails(): ProgressDetailsModel {
    if (this.spinnerStack.length === 0) {
      return null;
    }

    return this.spinnerStack[0];
  }

  startSpinner(details: ProgressDetailsModel): void {
    this.spinnerStack.push(details);
    this.showSpinnerSubject.next(true);
  }

  stopSpinner(id: string): void {
    const item = this.spinnerStack.find(e => e.id === id);
    const index = this.spinnerStack.indexOf(item);
    if (index > -1) { this.spinnerStack.splice(index, 1); }
    this.updateSpinnerSubject();
  }

  clearSpinner(): void {
    this.spinnerStack = [];
    this.updateSpinnerSubject();
  }

  private updateSpinnerSubject(): void {
    this.showSpinnerSubject.next(this.spinnerStack.length > 0);
  }
}
