import { Component } from '@angular/core';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private number_player:number;

  constructor(private pickerCtrl: PickerController) {
    this.number_player = 0;
  }

  async openPicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'number_player',
          options: [
            {
              text: 'JavaScript',
              value: 'javascript',
            }
          ],
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            window.alert(`You selected: ${value.number_player.value}`);
          },
        },
      ],
    });

    await picker.present();
  }

}
