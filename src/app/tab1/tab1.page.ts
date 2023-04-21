import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private router: Router) {}

  ngOnInit(){
    if(localStorage.getItem("session")?.length == 0){
      this.router.navigate(['/login']);
    }
  }

  
}
