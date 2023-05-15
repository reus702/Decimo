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
    cerca : new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z0-9]+$')])
  })
  
  campo: Partita[] | undefined;
  giocatori_iscritti: string[];

  constructor(private router: Router,private userService: UserService,public datepipe: DatePipe) {
    this.giocatori_iscritti = [];
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

  getOrario(orario:Date) {
    return this.datepipe.transform(orario, 'dd-MM-yyyy HH:mm');
  }

  controlloLunghezza(): boolean {
    if(this.campo?.length == 0) return true
    else return false;
  }

  isLoggedIn(){
    return localStorage.getItem("session") ? true : false;
  }

  giocaPartita(idPartita:number,personeMancanti:number){
  this.userService.inserisciPartitaGiocatore(idPartita,JSON.parse(localStorage.getItem("session") || "").email)
    .then(result => {
      if (result) {
        this.userService.aggiornaGiocatoriMancanti(idPartita,personeMancanti-1);
        alert("Il giocatore parteciperà alla partita");
      } else {
        alert("Errore nel registrazione della partita riprovare");
      }
    })
    .catch(error => {
      alert("Errore nel registrazione della partita riprovare");
    });
  }

  getGiocatoriIscritti(idPartita:number) {
    this.giocatori_iscritti = this.userService.getGiocatoriIscritti(idPartita);
  }

  async chiudiLista( role?: string) {
    return role !== 'gesture';
  }
}
