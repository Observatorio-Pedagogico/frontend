import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginForm } from 'src/app/shared/interfaces/login';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {
    this.form = this.formBuilder.group({
      email: [null],
      senha: [null]
      });
  }

  ngOnInit(): void {
  }


  fazerLogin(): void {

    let login = this.form.value as LoginForm;

    console.log(login);

    this.loginService.logar(login).subscribe({
      next: (response) => {
          localStorage.setItem("data",response.data.token);
          location.href = "/extracoes"
      },
      error: (error) => console.log(error),
    });
  }

}
