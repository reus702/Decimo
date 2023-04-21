import { Component } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  number_player:number;
  users: any[] = [];

  constructor(private pickerCtrl: PickerController, private userService: UserService,private router: Router) {
    this.number_player = 0;
  }

  ngOnInit(){
    if(localStorage.getItem("session")?.length == 0){
      this.router.navigate(['/login']); 
    }
  }

  ionViewDidEnter() {
    //this.userService.getUsers().subscribe((data: any) => {
     // this.users = data;
    //});
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
}
