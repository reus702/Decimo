import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "";
  constructor(private http: HttpClient, private router: Router) { }

  signUpUser(userInfo: string[]) {
    const body = {
      nome: userInfo[0],
      email: userInfo[1],
      password: userInfo[2],
      provincia: userInfo[3]
    }
    
    this.apiUrl = environment.baseUrl+'/signup';
    this.http.post(this.apiUrl,body).subscribe((result:any) => {
      console.log(result);
    });
    //return this.http.get(this.apiUrl);
  }

  logIn(userInfo: string[]){
    const body = {
      email: userInfo[0],
      password: userInfo[1],
    }
 
    this.apiUrl = environment.baseUrl + '/login';
    this.http.post(this.apiUrl,body).subscribe((result: any) => {
      if (!result || Object.keys(result).length == 0) {
        console.log("UTENTE NON PRESENTE NEL SISTEMA");
      } else {
        console.log(result[0].email);
        let email1:any;
        email1 = result[0].email;
        console.log("aaaa: "+email1);
        this.router.navigate(['/tabs']);
      }
    });
  }

  getUsers() {
    //this.apiUrl = environment.baseUrl+'/users';
    return this.http.get(this.apiUrl);
  }
}
