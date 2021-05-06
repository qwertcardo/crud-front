import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private router: Router) { }

  public signupForm = this.formBuilder.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    cpf: ["", Validators.required],
    birthDate: ["", Validators.required],
    login: ["", Validators.required],
    password: ["", Validators.required]
  });

  ngOnInit(): void {
  }

  save() {
    this.userService.save(this.signupForm.value as User).subscribe(
      () => this.router.navigate(["login"]),
      error => console.log(error)
    );
  }
}
