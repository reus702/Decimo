import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private apiUrl = 'http://localhost/database/dbhandler.js';
  private apiUrl = environment.baseUrl+'/users';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.apiUrl);
  }
}
