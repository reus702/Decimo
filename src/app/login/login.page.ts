import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logInUsers: any[] = [];

  constructor(private userService: UserService,private router: Router) {
  }

  loginForm = new FormGroup({
    email:new FormControl('',[Validators.email, Validators.required,Validators.pattern('[a-zA-Z0-9]+$')]),
    password:new FormControl('',[Validators.required, Validators.minLength(8),Validators.pattern('[a-zA-Z0-9]+$')]),
  })

  ngOnInit() {
  }
  
  logIn() {
    let email: any = this.loginForm.controls['email'].value
    let password: any = this.loginForm.controls['password'].value;
    let userInfo: string[] = [email, password];
    this.userService.logIn(userInfo);
  }

  getUserData(){
    let userData = localStorage.getItem("session") || "";
    return userData[0];
  }

}
