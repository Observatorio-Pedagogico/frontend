import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './navbar.service';
import { Profile } from '../../shared/interfaces/login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  sideActive: boolean = false;

  profile!: Profile;

  constructor(private router: Router, private navBarService: NavbarService) { }

  ngOnInit(): void {
    this.navBarService.setProfile().subscribe(response => {
      this.profile = response.data;
    });
  }

  logout() {
    sessionStorage.removeItem("logado");
    sessionStorage.removeItem("token");
    this.router.navigate(['login']);
  }

}
