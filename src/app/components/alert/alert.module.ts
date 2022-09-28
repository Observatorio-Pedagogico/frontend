import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AlertComponent,
    CustomAlertComponent
  ],
  imports: [
    CommonModule,
    ToastModule

  ],
  exports: [
    AlertComponent
  ]
})
export class AlertModule { }
