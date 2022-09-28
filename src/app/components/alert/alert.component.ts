import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  openAlert() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
  }


  openAlertCustom() {
  }

}
