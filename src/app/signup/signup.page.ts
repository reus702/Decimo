import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,  Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
 nomeUtente:string;
  email:string;
  password:string;
  confirmpwd:string;
  provincia:string;
  signedUpUser: any[] = [];

 //validatori input del form registrazione
 signupForm = new FormGroup({
  nome:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]+$')]),
  email:new FormControl('',[Validators.email, Validators.required]),
  password:new FormControl('',[Validators.required, Validators.minLength(8)]),
  confirmpwd: new FormControl('',[Validators.required]),
  provincia:new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('[A-Z]+$')])
}, [controlloPwd("password","confirmpwd")]);
//getter vallidatori form registraizone
  get nomeFormControl(){return this.signupForm.get('nome')}
  get emailFormControl(){return this.signupForm.get('email')}
  get passwordFormControl(){return this.signupForm.get('password')}
  get provinciaFormControl(){return this.signupForm.get('provincia')}

  constructor(private userService: UserService) { 
    this.nomeUtente = "";
    this.email = "";
    this.password = "";
    this.confirmpwd = "";
    this.provincia = "";
  }

  ngOnInit() {
  }

  signUpUser() {
    let userInfo: string[] = [this.nomeUtente,this.email,this.password,this.provincia];
    this.userService.signUpUser(userInfo);
  }

}
//funzione per il conrtollo match delle password in fase di registrazione
export function controlloPwd(pwd: string, controlPwd: string){
  return function(form: AbstractControl){
    if(form.get(pwd)?.value === form.get(controlPwd)?.value) return null
    return { passwordMismatchError: true}
  }
}
