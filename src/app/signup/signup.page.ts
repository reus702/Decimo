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
  listaProvince: any[] =[];
  provinciaCorrente: string;
 //validatori input del form registrazione
 signupForm = new FormGroup({
  nome:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9]+$')]),
  email:new FormControl('',[Validators.email, Validators.required]),
  password:new FormControl('',[Validators.required, Validators.minLength(8),Validators.pattern('[a-zA-Z0-9]+$')]),
  confirmpwd: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9]+$')]),
 // provincia:new FormControl('',[Validators.required])
}, [controlloPwd("password","confirmpwd")]);
//getter vallidatori form registraizone
  get nomeFormControl(){return this.signupForm.get('nome')}
  get emailFormControl(){return this.signupForm.get('email')}
  get passwordFormControl(){return this.signupForm.get('password')}
  get provinciaFormControl(){return this.signupForm.get('provincia')}

  getProvince(){
    return this.userService.getProvince();
  }
  constructor(private userService: UserService) { 
    this.listaProvince = this.getProvince();
    this.provinciaCorrente = "";
  }

  ngOnInit() {
  }

  signUpUser() {
    let userInfo: any[] = [this.signupForm.controls['nome'].value ,this.signupForm.controls['email'].value,this.signupForm.controls['password'].value,this.provinciaCorrente];
    this.userService.signUpUser(userInfo);
  }

  handleChange(value: string) {
    this.provinciaCorrente = value;
    console.log("provincia: "+this.provinciaCorrente);
  }

}
//funzione per il conrtollo match delle password in fase di registrazione
export function controlloPwd(pwd: string, controlPwd: string){
  return function(form: AbstractControl){
    if(form.get(pwd)?.value === form.get(controlPwd)?.value) return null
    return { passwordMismatchError: true}
  }
}
