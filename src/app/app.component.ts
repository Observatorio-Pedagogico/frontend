import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'observatorio-pedagogico';

  constructor(private _appRoutingModule: AppRoutingModule){}

  get appRoutingModule(): AppRoutingModule {
    return this._appRoutingModule;
  }

}


