import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Campo } from '../services/campo';
import { User } from '../services/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
   campo: Campo[] | undefined;

  constructor(private router: Router,private userService: UserService) {
    var campo:Campo[];
  }

  ngOnInit(){
    if(localStorage.getItem("session")?.length == 0){
      this.router.navigate(['/login']);
    }else{
      this.userService.richiestaCampi(JSON.parse(localStorage.getItem("session") || "").provincia);

      var campi = localStorage.getItem("campiUtente") ;
      
      this.campo = campi as unknown as Campo[];

      // MANCA I DIV PER OGNI CAMPO 
    }
  }

  controlloLunghezza(): boolean
  {
    console.log(localStorage.getItem("campiUtente")?.length);
    if(localStorage.getItem("campiUtente") == undefined) return true
    else return false;
  }

  
}
