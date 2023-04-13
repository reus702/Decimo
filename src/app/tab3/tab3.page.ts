import { Component } from '@angular/core';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private loginPage: LoginPage) {
  }

  ngOnInit(){}

  getEmail(){
    return JSON.parse(localStorage.getItem("session") || "").email;   
  }

  getNome(){
    return JSON.parse(localStorage.getItem("session") || "").nome;   
  }

  getProvincia(){
    return JSON.parse(localStorage.getItem("session") || "").provincia;   
  }

  getBio(){
    return JSON.parse(localStorage.getItem("session") || "").bio;   
  }
}
