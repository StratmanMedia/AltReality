import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { ProgressIndicatorModule } from '../progress-indicator/progress-indicator.module';


@NgModule({
  declarations: [
    UserLayoutComponent
  ],
  imports: [
    CommonModule,
    ProgressIndicatorModule,
    UserLayoutRoutingModule
  ]
})
export class UserLayoutModule { }
