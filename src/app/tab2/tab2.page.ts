import { Component } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
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

  constructor(private pickerCtrl: PickerController, private userService: UserService,private router: Router,public datepipe: DatePipe) {
    this.number_player = 0;
    this.listaProvince = this.getProvince();
    //this.listaCampi = this.getCampiProvincia();
    this.provinciaCorrente = "";
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

  newGame(form: NgForm) {
    const giocatoriRimanenti = this.number_player;
    //const dataPartita = form.value.dataPartita;
    let dataPartita = form.value.dataPartita;
    dataPartita = this.datepipe.transform(dataPartita, 'yyyy-MM-dd HH:mm:ss');

    const infoPartita = form.value.infoPartita;
    const emailUser = JSON.parse(localStorage.getItem("session") || "").email;
  
    let gameInfo: string[] = [giocatoriRimanenti,dataPartita,infoPartita,emailUser];
    
    this.userService.newGame(gameInfo);
    form.reset();
  }

  getProvince(){
    return this.userService.getProvince();
  }

  getCampiProvincia(){
    //return this.userService.getCampiProvincia(this.getCampiProvincia);
  }

  handleChange(value: string) {
    this.provinciaCorrente = value;
    console.log("provincia: "+this.provinciaCorrente);
  }
}