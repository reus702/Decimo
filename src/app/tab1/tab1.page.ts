import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Partita } from '../services/partita';
import { User } from '../services/user';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  ricerca = new FormGroup({
    cerca : new FormControl('',[Validators.required])
  })
  campo: Partita[] | undefined;

  constructor(private router: Router,private userService: UserService,public datepipe: DatePipe) {
    var campo:Partita[];
  }

  ngOnInit(){
    if(localStorage.getItem("session")?.length == 0){
      this.router.navigate(['/login']);
    }else{
      this.campo = this.userService.richiestaCampi(JSON.parse(localStorage.getItem("session") || "").provincia);
    }
  }

  ricercaCampi(){
    
    let cerca = this.ricerca.controls['cerca'].value;
    if(localStorage.getItem("session")?.length == 0){
      this.router.navigate(['/login']);
    }else{
      
      this.campo = this.userService.ricercaCampi(cerca,JSON.parse(localStorage.getItem("session") || "").provincia);
    }
  }

  getOrario(orario:Date)
  {
    return this.datepipe.transform(orario, 'dd-MM-yyyy HH:mm');
  }
  controlloLunghezza(): boolean
  {
    if(this.campo?.length == 0) return true
    else return false;
  }

  
}
