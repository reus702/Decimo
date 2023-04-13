import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string;
  password:string;
  logInUsers: any[] = [];

  constructor(private userService: UserService,private router: Router) {
    this.email = "";
    this.password = "";
  }

  ngOnInit() {}
  
  logInUser(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    //localStorage.setItem('session', form.value.email);
    
    let userInfo: string[] = [email,password];
    this.userService.logIn(userInfo);
    form.reset();
  }

  getUserData(){
    let userData = localStorage.getItem("session") || "";
    return userData[0];
  }

}
