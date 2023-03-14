import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "";

  constructor(private http: HttpClient) { }

  signUpUser() {
    this.apiUrl = environment.baseUrl+'/signup';
    return this.http.get(this.apiUrl);
  }

  getUsers() {
    this.apiUrl = environment.baseUrl+'/users';
    return this.http.get(this.apiUrl);
  }
}
