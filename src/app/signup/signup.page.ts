import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  nome:string;
  email:string;
  password:string;
  confirmpwd:string;
  provincia:string;
  signedUpUser: any[] = [];

  constructor(private userService: UserService) { 
    this.nome = "";
    this.email = "";
    this.password = "";
    this.confirmpwd = "";
    this.provincia = "";
  }

  ngOnInit() {
  }

  signUpUser() {
    console.log(this.nome);
    this.userService.signUpUser().subscribe((data: any) => {
      this.signedUpUser = data;
    });
  }

}
