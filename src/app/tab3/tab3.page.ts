import { Component } from '@angular/core';
import { LoginPage } from '../login/login.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  

  constructor(private loginPage: LoginPage,private router: Router) {
  }

  ngOnInit(){
    if(localStorage.length == 0){
      this.router.navigate(['/login']);
    }
  }

  isUserLoggedIn(){
    if(localStorage.length != 0) return true;
    else return false;
  }

  getEmail(){
    if(localStorage.length != 0){
      return JSON.parse(localStorage.getItem("session") || "").email;   
    }else return "";
  }

  getNome(){
    if(localStorage.length != 0){
      return JSON.parse(localStorage.getItem("session") || "").nome;   
    }else return "";
  }

  getProvincia(){
    if(localStorage.length != 0){
      return JSON.parse(localStorage.getItem("session") || "").provincia;   
    }else return "";
  }

  getBio(){
    if(localStorage.length != 0){
      return JSON.parse(localStorage.getItem("session") || "").bio;   
    }else return "";
  }

  logout(){
    localStorage.removeItem("session");
    this.router.navigate(['/login']);
  }
}
