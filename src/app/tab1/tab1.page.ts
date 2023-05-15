import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Partita } from '../services/partita';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
 
  /**
   * controllo del form di ricerca delle partite
   */
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
      this.campo = this.userService.partiteProvinciaDefault(JSON.parse(localStorage.getItem("session") || "").provincia);
    }
  }

  /**
   * metodo che cerca le partite in base al criterio messo in input
   */
  ricercaPartite(){
    if(localStorage.getItem("session")?.length == 0){
      this.router.navigate(['/login']);
    }else{
      let cerca = this.ricerca.controls['cerca'].value;
      this.campo = this.userService.ricercaPartite(cerca);
    }
  }
  /**
   * 
   * @param orario orario da formattare
   * @returns orario della partita formattato
   */
  getOrario(orario:Date) {
    return this.datepipe.transform(orario, 'dd-MM-yyyy HH:mm');
  }

  controlloLunghezza(): boolean {
    if(this.campo?.length == 0) return true
    else return false;
  }

  /**
   * controlla che l'utente sia loggato
   * @returns ture se l'utente è loggato false atrimenti
   */
  isLoggedIn(){
    return localStorage.getItem("session") ? true : false;
  }

  /**
   * 
   * @param idPartita partita alla quale l'utente vuole partecipare
   * @param personeMancanti 
   */
  giocaPartita(idPartita:number,personeMancanti:number){
  this.userService.inserisciPartitaGiocatore(idPartita,JSON.parse(localStorage.getItem("session") || "").email)
    .then(result => {
      if (result) {
        this.userService.aggiornaGiocatoriMancanti(idPartita,personeMancanti-1);
        alert("Il giocatore parteciperà alla partita");
      } else {
        alert("Errore nel registrazione della partita riprovare");
      }
    });
  }
  /**
   * 
   * @param idPartita partita della quale vogliamo conoscere i giocatori
   */
  getGiocatoriIscritti(idPartita:number) {
    this.giocatori_iscritti = this.userService.getGiocatoriIscritti(idPartita);
  }

  //funzione per chiudre la lista dei giocatori iscirtti
  async chiudiLista( role?: string) {
    return role !== 'gesture';
  }
}
