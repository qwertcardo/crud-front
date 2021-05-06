import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginRequest, LoginResponse } from 'src/app/model/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.buildForm();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.loginForm.value as LoginRequest).subscribe(
      resp => {
        sessionStorage.setItem("crud-session", JSON.stringify(resp as LoginResponse));
        this.authService.isLogged();
        this.router.navigate(["profile"]);
      },
      err => console.log(err)
    );
  }

  resetForm() {
    this.loginForm = this.buildForm();
  }

  buildForm() {
    return this.formBuilder.group({
      principal: ["", Validators.required],
      credential: ["", Validators.required]
    });
  }
}
