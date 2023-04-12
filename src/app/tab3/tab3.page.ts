import { Component } from '@angular/core';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private loginPage: LoginPage) {
  }

  ngOnInit(){}

  getUserData(){
    return this.loginPage.getUserData();
  }

}
