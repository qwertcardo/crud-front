import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public isLogged: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getSubject().subscribe(logged => this.isLogged = logged);
    this.authService.isLogged();
  }

  logout() {
    this.authService.logout();
  }
}
