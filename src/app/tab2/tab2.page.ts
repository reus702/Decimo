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
    data_ora:new FormControl('',[Validators.required]),
    info: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9" "]+$')]),
    provincia:new FormControl('',[Validators.required]),
    campo:new FormControl('',[Validators.required])
  })

  newFieldForm = new FormGroup({
    provinciaCampo: new FormControl('',[Validators.required]),
    tipoCampo:new FormControl('',[Validators.required]),
    descrizioneCampo: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9" "]+$')]),
    viaCampo: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9" "]+$')]),
  })


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

  nuovoCampo() {
    const provinciaCampo = this.newFieldForm.controls['provinciaCampo'].value;
    const tipoCampo = this.newFieldForm.controls['tipoCampo'].value;
    const descCampo = this.newFieldForm.controls['descrizioneCampo'].value;
    const viaCampo = this.newFieldForm.controls['viaCampo'].value;

    let fieldInfo: string[] | any = [provinciaCampo,tipoCampo,descCampo,viaCampo];
    
    this.userService.newField(fieldInfo);
    this.newFieldForm.reset();
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

  getTipologieCampo(){
    return this.userService.getTipologieCampo();
  }

  isLoggedIn(){
    return localStorage.getItem("session") ? true : false;
  }
}