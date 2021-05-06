import { apiUrl } from './../../environments/environment';
import { User } from '../model/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  save(user: User) {
    return this.http.post(`${apiUrl}/users/save`, user);
  }

  getLoggedUser(id: number) {
    return this.http.get(`${apiUrl}/users/${id}`);
  }

  getUserId() {
    return JSON.parse(sessionStorage.getItem("crud-session")!).user.id;
  }

  update(userId: number, user: User) {
    return this.http.put(`${apiUrl}/users/${userId}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${apiUrl}/users/${id}`);
  }

  getUsersProducts(id: number) {
    return this.http.get(`${apiUrl}/product/user/${id}`);
  }
}
