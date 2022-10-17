import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  openAlert(_severity: string, _summary: string, _detail: string) {
    this.messageService.add({severity: _severity, summary: _summary, detail: _detail});
  }

}
