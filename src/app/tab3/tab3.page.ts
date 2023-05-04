import { Component } from '@angular/core';
import { LoginPage } from '../login/login.page';
import { Router } from '@angular/router';
import { Partita } from '../services/partita';
import { DatePipe } from '@angular/common'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  campo: Partita[] | undefined;

  constructor(private loginPage: LoginPage,private router: Router,public datepipe: DatePipe,private userService: UserService) {
  }

  ngOnInit(){
    this.campo = this.userService.richiestaPartiteGiocate(JSON.parse(localStorage.getItem("session") || "").email); 
  }

  getEmail(){
    if(localStorage.getItem("session") != null){
      return JSON.parse(localStorage.getItem("session") || "").email;   
    }
  }

  getNome(){
    if(localStorage.getItem("session") != null){
      return JSON.parse(localStorage.getItem("session") || "").nome;   
    }
  }

  getProvincia(){
    if(localStorage.getItem("session") != null){
      return JSON.parse(localStorage.getItem("session") || "").provincia;   
    }
  }

  getBio(){
    if(localStorage.getItem("session") != null){
      return JSON.parse(localStorage.getItem("session") || "").bio;   
    }
  }

  logout(){
    localStorage.removeItem("session");
    this.router.navigateByUrl('/login');
  }

  isLoggedIn(){
    return localStorage.getItem("session") ? true : false;
  }

  getOrario(orario:Date) {
    return this.datepipe.transform(orario, 'dd-MM-yyyy HH:mm');
  }
}