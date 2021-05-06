import { LoginRequest } from './../model/interfaces';
import { apiUrl } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _isLogged = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  login(requestData: LoginRequest) {
    return this.http.post(`${apiUrl}/login`, requestData);
  }

  logout() {
    sessionStorage.removeItem("crud-session");
    this._isLogged.next(false);
  }

  isLogged() {
    if(sessionStorage.getItem("crud-session")){
      this._isLogged.next(true);
      return true;
    } else {
      this._isLogged.next(false);
      return false;
    }
  }

  getToken() {
    return JSON.parse(window.sessionStorage.getItem('crud-session')!).token;
  }

  getSubject() {
    return this._isLogged.asObservable();
  }
}
