import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from './user';
import { Partita } from './partita';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = "";
  constructor(private http: HttpClient, private router: Router) { }

  signUpUser(userInfo: string[]) {
    const body = {
      nome: userInfo[0],
      email: userInfo[1],
      password: userInfo[2],
      provincia: userInfo[3]
    }
    
    this.apiUrl = environment.baseUrl+'/signup';
    this.http.post(this.apiUrl,body).subscribe((result:any) => {
      console.log(result);
    });
    //return this.http.get(this.apiUrl);
  }

  richiestaCampi(provincia: string)
  {
    let campi:Partita[];
    this.apiUrl = environment.baseUrl + '/campiPerProvincia';

    this.http.post(this.apiUrl,provincia).subscribe((result: any) => {
      if (!result || Object.keys(result).length == 0) {
        console.log("NESSUN CAMPO DISPONIBILE CON QUESTA PROVINCIA");
      } else {
        for(let i = 0 ; i<Object.keys(result).length ;i++)
        {
          campi[i] = new Partita(result[i].descrizione,result[i].provincia,result[i].campo,result[i].persone_mancanti); //creo oggetto utente
        }
        localStorage.setItem("campiUtente",JSON.stringify(campi)); //carico informazioni utente su localStorage
      }
    });
  }
  logIn(userInfo: string[]){
    const body = {
      email: userInfo[0],
      password: userInfo[1],
    }
 
    this.apiUrl = environment.baseUrl + '/login';
    this.http.post(this.apiUrl,body).subscribe((result: any) => {
      if (!result || Object.keys(result).length == 0) {
        console.log("UTENTE NON PRESENTE NEL SISTEMA");
      } else {
        const user = new User(result[0].nome, result[0].email, result[0].provincia, result[0].bio); //creo oggetto utente
        
        localStorage.setItem("session",JSON.stringify(user)); //carico informazioni utente su localStorage
        //let nome = JSON.parse(localStorage.getItem("session") || "");   //recupero informazioni da localStorage
        this.router.navigate(['/tabs']); //dopo aver effettuato login mostro la home page
      }
    });
  }

  getUsers() {
    //this.apiUrl = environment.baseUrl+'/users';
    return this.http.get(this.apiUrl);
  }
 
  newGame(gameInfo: string[]) {
    const body = {
      giocatoriRimanenti: gameInfo[0],
      dataPartita: gameInfo[1],
      infoPartita: gameInfo[2],
      emailUser: gameInfo[3]
    }
    
    this.apiUrl = environment.baseUrl+'/newgame';

    this.http.post(this.apiUrl,body).subscribe((result:any) => {
      console.log(result);
    });
    //return this.http.get(this.apiUrl);
  }

  getProvince() {
    this.apiUrl = environment.baseUrl+'/getprov';
    let provList:string[] = [];

    this.http.post(this.apiUrl,"").subscribe((result:any) => {
      for(let i = 0; i < result.length; i ++){
        provList[i] = JSON.parse(JSON.stringify(result[i].provincia));
      }      
    });
    return provList;
  }

  

}