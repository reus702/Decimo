import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from './user';
import { Partita } from './partita';
import { Console } from 'console';

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

  richiestaCampi(provincia: string):Partita[]
  {
    const body = {provincia: provincia};
    let campi:Partita[]=[];
    this.apiUrl = environment.baseUrl + '/campiPerProvincia';

    this.http.post(this.apiUrl,body).subscribe((result: any) => {
      if (!result || Object.keys(result).length == 0) {
        console.log("NESSUNA PARTITA DISPONIBILE CON QUESTA PROVINCIA");
      } else {
        for(let i = 0 ; i<Object.keys(result).length ;i++)
        {
          campi[i] = new Partita(result[i].descrizione,provincia,result[i].campo,result[i].persone_mancanti,result[i].orario); //creo oggetto utente
        }
      }
    });
    return campi;
  }

  ricercaCampi(ricerca:String|null,provincia: string):Partita[]
  {
    const body = {ricerca: ricerca};
    let campi:Partita[]=[];
    this.apiUrl = environment.baseUrl + '/ricercaPartite';

    this.http.post(this.apiUrl,body).subscribe((result: any) => {
      if (!result || Object.keys(result).length == 0) {
        console.log("NESSUNA PARTITA DISPONIBILE CON QUESTA RICERCA");
      } else {
        for(let i = 0 ; i<Object.keys(result).length ;i++)
        {
          console.log("ESTRAGGO PARTITE");
          campi[i] = new Partita(result[i].descrizione,provincia,result[i].campo,result[i].persone_mancanti,result[i].orario); //creo oggetto 
        }
      }
    });
    return campi;
  }

  listaCampiPerProvincia(provincia: string) {  //metodo per estrarre campi appartenenti ad una provincia per la combo box
    //let campi:Campo[] = [];
    let campi:string[] = [];
    this.apiUrl = environment.baseUrl + '/campiProvincia';
    const body = {
      provincia: provincia,
    }

    this.http.post(this.apiUrl,body).subscribe((result: any) => {
      if (!result || Object.keys(result).length == 0) {
        console.log("NESSUN CAMPO DISPONIBILE CON QUESTA PROVINCIA");
      } else {
        for(let i = 0 ; i<Object.keys(result).length ;i++) {
          //campi[i] = new Campo(result[i].descrizione,result[i].provincia,result[i].campo,result[i].persone_mancanti); //creo oggetto utente
          //campi[i] = new Campo(JSON.parse(JSON.stringify(result[i].descrizione)), provincia,JSON.parse(JSON.stringify(result[i].tipoCampo)));
          campi[i] = JSON.parse(JSON.stringify(result[i].descrizione));
        }
      }
    });
    return campi;
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
      emailUser: gameInfo[0],
      giocatoriRimanenti: gameInfo[1],
      campo: gameInfo[2],
      infoPartita: gameInfo[3],
      dataPartita: gameInfo[4]
    }
    
    this.apiUrl = environment.baseUrl+'/newgame';

    this.http.post(this.apiUrl,body).subscribe((result:any) => {
      console.log(result);
    });
  }

}