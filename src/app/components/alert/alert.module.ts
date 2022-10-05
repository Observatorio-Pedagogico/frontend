import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { AlertCustomComponent } from './alert-custom.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AlertCustomComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    ToastModule
  ],
  exports: [
    AlertCustomComponent,
    AlertComponent
  ],
  providers: [MessageService]
})
export class AlertModule { }
