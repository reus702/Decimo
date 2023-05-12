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
  provinciaCorrente: string;
  campoCorrente: string;

  constructor(private pickerCtrl: PickerController, private userService: UserService,private router: Router,public datepipe: DatePipe) {
    this.number_player = 0;
    this.listaProvince = this.getProvince();
    this.listaCampi = [];
    this.provinciaCorrente = "";
    this.campoCorrente = "";
  }

  ngOnInit(){
    if(localStorage.getItem("session")?.length == 0){
      this.router.navigate(['/login']); 
    }
  }

  async openPicker() {
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

  newMatchForm = new FormGroup({
    //giocatori_mancanti:new FormControl('',[butt]),
    data_ora:new FormControl('',[Validators.required]),
    info: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9" "]+$')]),
    provincia:new FormControl('',[Validators.required]),
    campo:new FormControl('',[Validators.required])
  })

  newGame() {
    const giocatoriRimanenti = this.number_player;
    const infoPartita = this.newMatchForm.controls['info'].value;
    const emailUser = JSON.parse(localStorage.getItem("session") || "").email;
    let dataPartita =this.newMatchForm.controls['data_ora'].value;
    dataPartita = this.datepipe.transform(dataPartita, 'yyyy-MM-dd HH:mm:ss');

    let gameInfo: string[] = [emailUser,giocatoriRimanenti,this.campoCorrente,infoPartita,dataPartita];
    
    this.userService.newGame(gameInfo);
    this.newMatchForm.reset();
    //form.reset();
  }

  getProvince(){
    return this.userService.getProvince();
  }

  getCampiProvincia(){
    this.listaCampi = this.userService.listaCampiPerProvincia(this.provinciaCorrente);
  }

  handleChangeProvincia(value: string) {
    this.provinciaCorrente = value;
    this.getCampiProvincia();
  }

  handleChangeCampo(value: string) {
    this.campoCorrente = value;
    console.log("provincia: "+this.provinciaCorrente);
  }

  isLoggedIn(){
    return localStorage.getItem("session") ? true : false;
  }
}