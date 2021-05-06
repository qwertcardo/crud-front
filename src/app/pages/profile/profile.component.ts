import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Product, User } from 'src/app/model/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userId?: number;
  public user?: User;
  public products: Product[] = [];

  bad: boolean = false;
  notBad: boolean = false;
  good: boolean = false;

  public onEdit: boolean = false;
  public onDelete: boolean = false;
  
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) { }
    
    public profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      birthDate: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required]
    });;

  ngOnInit(): void {
    this.userId = this.userService.getUserId();

    if(this.userId){
      this.userService.getLoggedUser(this.userId).subscribe(
        resp => {
          this.user = resp as User;
          this.profileForm.patchValue(this.user);
        }, err => console.log(err)
      );
      
      this.userService.getUsersProducts(this.userId).subscribe(
        resp => {
          this.products = resp as Product[];
          this.sellPercentageReached();
        }, err => console.log(err)
      );
    }
  }

  sellPercentageReached(){
    if(this.products.length){
      const amount = this.products.map(product => product.inStock + product.selled!).reduce((a,b) => a + b);
      const selled = this.products.map(product => product.selled).reduce((a,b) => a! + b!);
      if((selled! * 100 / amount) > 70) {
        this.good = true;
      } else if((selled! * 100 / amount) > 50) {
        this.notBad = true;
      } else {
        this.bad = true
      };
      return Math.floor(selled! * 100 / amount);
    } else {
      return 0;
    }
  }

  update() {
    this.userService.update(this.userId!, this.profileForm.value as User).subscribe(
      () =>  this.edit(),
      err => console.log(err)
    );
  }

  confirmDelete(){
    this.userService.delete(this.userId!).subscribe(
      () => {
        this.router.navigate([""]);
        sessionStorage.clear();
      },
      err => console.log(err)
    );
  }

  edit() {
    this.onEdit = !this.onEdit;
    this.onDelete = false;
  }

  delete() {
    this.onDelete = !this.onDelete;
    this.onEdit = false;
  }

}
