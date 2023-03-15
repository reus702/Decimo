import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
  password:string;
  logInUsers: any[] = [];

  constructor(private userService: UserService) {
    this.email = "";
    this.password = "";
   }

  ngOnInit() {
  }

  logInUser() {
    console.log(this.email);
    this.userService.logIn().subscribe((data: any) => {
      this.logInUsers = data;
    });
  }

}
