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
    if(localStorage.getItem("session")?.length == 0){
      this.router.navigate(['/login']); 
    }
    /*
    if(localStorage.length == 0){
      this.router.navigate(['/login']);
    }*/
  }

  getEmail(){
    if(localStorage.getItem("session")?.length != 0){
      return JSON.parse(localStorage.getItem("session") || "").email;   
    }
  }

  getNome(){
    if(localStorage.getItem("session")?.length != 0){
      return JSON.parse(localStorage.getItem("session") || "").nome;   
    }
  }

  getProvincia(){
    if(localStorage.getItem("session")?.length != 0){
      return JSON.parse(localStorage.getItem("session") || "").provincia;   
    }
  }

  getBio(){
    if(localStorage.getItem("session")?.length != 0){
      return JSON.parse(localStorage.getItem("session") || "").bio;   
    }
  }

  logout(){
    //localStorage.removeItem("session");
    localStorage.setItem("session", "");
    //this.router.navigate(['/login']);
    this.router.navigate(['/login'], {replaceUrl: true});
  }
}