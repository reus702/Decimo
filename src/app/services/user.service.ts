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

  logIn(){
    this.apiUrl = environment.baseUrl + '/login';
    
   this.http.get(this.apiUrl).subscribe((result: any) => {
    if (!result || Object.keys(result).length == 0) {
      console.log("UTENTE NON PRESENTE NEL SISTEMA");
    } else {
      console.log(result);
    }
  });
    return this.http.get(this.apiUrl);
  }

  getUsers() {
    this.apiUrl = environment.baseUrl+'/users';
    return this.http.get(this.apiUrl);
  }
}
