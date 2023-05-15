import { Component } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  number_player:number;
  users: any[] = [];
  listaProvince: any[] =[];
  listaCampi: any[] = [];
  tipologieCampi: any[] = [];
  provinciaCorrente: string;
  campoCorrente: string;

  constructor(private pickerCtrl: PickerController, private userService: UserService,private router: Router,public datepipe: DatePipe) {
    this.number_player = 0;
    this.listaProvince = this.getProvince();
    this.listaCampi = [];
    this.tipologieCampi = this.getTipologieCampo();
    this.provinciaCorrente = "";
    this.campoCorrente = "";
  }

  /**
   * Funzione che gestisce il picker per il numero di giocatori mancanti ad una partita
   */
  async openPickerNumberPlayer() {
    const options = [];
    for (let i = 1; i <= 20; i++) {
      options.push({
        text: i.toString(),
        value: i.toString(),
      });
    }
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'number_player',
          options: options,
        },
      ],
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
        },
        {
          text: 'Conferma',
          handler: (value) => {
            this.number_player =  value.number_player.value;
          },

        },
      ],
    });

    await picker.present();
  }

  /**
   * Form group per i dati relativi alla partita, con i relativi validatori
   */
  newMatchForm = new FormGroup({
    data_ora:new FormControl('',[Validators.required]),
    info: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9" "]+$')]),
    provincia:new FormControl('',[Validators.required]),
    campo:new FormControl('',[Validators.required])
  })

  /**
   * Form group per i dati relativi al campo, con i relativi validatori
   */
  newFieldForm = new FormGroup({
    provinciaCampo: new FormControl('',[Validators.required]),
    tipoCampo:new FormControl('',[Validators.required]),
    descrizioneCampo: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9" "]+$')]),
    viaCampo: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9" "]+$')]),
  })

  /**
   * Funzione che gestisce l'azione del bottone che crea la partita
   */
  newGame() {
    const giocatoriRimanenti = this.number_player;
    const infoPartita = this.newMatchForm.controls['info'].value;
    const emailUser = JSON.parse(localStorage.getItem("session") || "").email;
    let dataPartita = this.newMatchForm.controls['data_ora'].value;
    dataPartita = this.datepipe.transform(dataPartita, 'yyyy-MM-dd HH:mm:ss');

    let gameInfo: string[] = [emailUser,giocatoriRimanenti,this.campoCorrente,infoPartita,dataPartita];
    
    this.userService.newGame(gameInfo);
    this.newMatchForm.reset();
  }

  /**
   * Funzione che gestisce l'azione del bottone che aggiunge il campo
   */
  nuovoCampo() {
    const provinciaCampo = this.newFieldForm.controls['provinciaCampo'].value;
    const tipoCampo = this.newFieldForm.controls['tipoCampo'].value;
    const descCampo = this.newFieldForm.controls['descrizioneCampo'].value;
    const viaCampo = this.newFieldForm.controls['viaCampo'].value;

    let fieldInfo: string[] | any = [provinciaCampo,tipoCampo,descCampo,viaCampo];
    
    this.userService.newField(fieldInfo);
    this.newFieldForm.reset();
  }

  /**
   * Restituisce le province da inserire nelle combobox
   * @returns lista province
   */
  getProvince(){
    return this.userService.getProvince();
  }

   /**
   * Restituisce i campi appartenenti alla provincia scelta nella combobox delle province
   * @returns lista campi
   */
  getCampiProvincia(){
    this.listaCampi = this.userService.listaCampiPerProvincia(this.provinciaCorrente);
  }

  /**
   * Quando viene scelta una provincia nella combobox, vengono caricati i campi appartenenti alla provincia scelta
   * nella combobox dei campi
   * @param value provincia scelta nella combobox delle province
   */
  handleChangeProvincia(value: string) {
    this.provinciaCorrente = value;
    this.getCampiProvincia();
  }

  /**
   * Ongi volta che viene scelto un campo nella combobox, lo assegniamo alla variabile campoCorrente
   * @param value campo scelto
   */
  handleChangeCampo(value: string) {
    this.campoCorrente = value;
  }

  /**
   * Restituisce i tipi di campo da inserire nella combobox
   * @returns lista tipologie dei campi
   */
  getTipologieCampo(){
    return this.userService.getTipologieCampo();
  }

  /**
   * Metodo per stabilire se l'utente ha effettuato l'accesso al proprio profilo o meno
   * @returns true se l'utente ha effettuato l'accesso al proprio profilo, false altrimenti
   */
  isLoggedIn(){
    return localStorage.getItem("session") ? true : false;
  }
}