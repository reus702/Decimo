import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,  Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signedUpUser: any[] = [];

 //validatori input del form registrazione
 signupForm = new FormGroup({
  nome:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9]+$')]),
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
  }

  ngOnInit() {
  }

  signUpUser() {
    let userInfo: any[] = [this.signupForm.controls['nome'].value ,this.signupForm.controls['email'].value,this.signupForm.controls['password'].value,this.signupForm.controls['provincia'].value];
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
