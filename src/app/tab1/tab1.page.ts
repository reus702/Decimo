import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Partita } from '../services/partita';
import { User } from '../services/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
   campo: Partita[] | undefined;

  constructor(private router: Router,private userService: UserService) {
    var campo:Partita[];
  }

  ngOnInit(){
    if(localStorage.getItem("session")?.length == 0){
      this.router.navigate(['/login']);
    }else{
      
      this.campo = this.userService.richiestaCampi(JSON.parse(localStorage.getItem("session") || "").provincia);

      // MANCA I DIV PER OGNI CAMPO 
    }
  }

  controlloLunghezza(): boolean
  {
    if(this.campo?.length == 0) return true
    else return false;
  }

  
}
