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
  /**
   * registazione utente
   * @param userInfo informazioni dell'utente
   */
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
  }

  /**
   * 
   * @param provincia carica le partite per la pronvicia dell'utente
   * @returns lista  partite per la pronvicia dell'utente
   */
  partiteProvinciaDefault(provincia: string):Partita[] {
    const body = {provincia: provincia};
    let campi:Partita[]=[];
    this.apiUrl = environment.baseUrl + '/campiPerProvincia';

    this.http.post(this.apiUrl,body).subscribe((result: any) => {
      if (!result || Object.keys(result).length == 0) {
        console.log("NESSUNA PARTITA DISPONIBILE CON QUESTA PROVINCIA");
      } else {
        for(let i = 0 ; i<Object.keys(result).length ;i++)
        {
          campi[i] = new Partita(result[i].id,result[i].descrizione,provincia,result[i].campo,result[i].persone_mancanti,result[i].orario,result[i].via); //creo oggetto utente
        }
      }
    });
    return campi;
  }

  /**
   * 
   * @param ricerca stringa di ricerca della partita
   * @returns lista di partite disponibili
   */
  ricercaPartite(ricerca:String|null):Partita[] {
    const body = {ricerca: ricerca};
    let partite:Partita[]=[];
    this.apiUrl = environment.baseUrl + '/ricercaPartite';

    this.http.post(this.apiUrl,body).subscribe((result: any) => {
      if (!result || Object.keys(result).length == 0) {
        console.log("NESSUNA PARTITA DISPONIBILE CON QUESTA RICERCA");
      } else {
        for(let i = 0 ; i<Object.keys(result).length ;i++) {
          partite[i] = new Partita(result[i].id,result[i].descrizione,result[i].provincia,result[i].campo,result[i].persone_mancanti,result[i].orario,result[i].via); //creo oggetto 
        }
      }
    });
    return partite;
  }

  /**
   * metodo per estrarre campi appartenenti ad una provincia per la combo box
   * @param provincia provincia della quale si vogliono conoscere i campi
   * @returns lista di campi della provincia 
   */
  listaCampiPerProvincia(provincia: string) {  
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
          campi[i] = JSON.parse(JSON.stringify(result[i].descrizione));
        }
      }
    });
    return campi;
  }

  /**
   * 
   * @returns restituisce la lista delle province del sistema
   */
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

  /**
   * 
   * @param userInfo informazioni dell'utente per effettuare il login
   */
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
  
  /**
   * 
   * @param gameInfo informazioni per creare una nuova partita
   */
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

  /**
   * 
   * @param userEmail email del giocatore che vuole vedere le sue partite
   * @returns lista di partite giocate
   */
  richiestaPartiteGiocate(userEmail: string){
    const body = { userEmail: userEmail }
    let partiteGiocate:Partita[]=[];

    this.apiUrl = environment.baseUrl + '/ricercaPartiteGiocate';
    this.http.post(this.apiUrl,body).subscribe((result: any) => {
      if (!result || Object.keys(result).length == 0) {
        console.log("NESSUNA PARTITA DISPONIBILE");
      } else {
        for(let i = 0 ; i<Object.keys(result).length ;i++) {
          partiteGiocate[i] = new Partita(result[i].id,result[i].descrizione,result[i].provincia,result[i].campo,result[i].persone_mancanti,result[i].orario,result[i].via); //creo oggetto partita
        }
      }
    }); 
    return partiteGiocate;
  }
  /**
   * 
   * @param idPartita partita alla quale un giocatore vuole partecipare
   * @param giocatore giocatore che partecipa alla partita
   * @returns 
   */
  inserisciPartitaGiocatore(idPartita:number,giocatore:string) : Promise<boolean>{
    const body = {
      userEmail: giocatore,
      idPartita:idPartita
    }
    this.apiUrl = environment.baseUrl + '/inserisciPartitaGiocatore';

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl,body).subscribe((result: any) => {
        if (!result || Object.keys(result).length == 0) {
          console.log("NESSUNA PARTITA DISPONIBILE");
          resolve(false);
        } else {
          console.log("PARTITA REGISTRATA");
          resolve(true);
        }
      }, error => {
        console.log("ERRORE: " + error);
        reject(false);
      }); 
    });
  }

  /**
   * 
   * @param idPartita partita da aggiornare
   * @param personeMancanti numero giocatori da scalare
   */
  aggiornaGiocatoriMancanti(idPartita:number,personeMancanti:number){
    const body = {
      personeMancanti: personeMancanti,
      id:idPartita
    }

    this.apiUrl = environment.baseUrl + '/updateGiocatoriMancanti';
    this.http.post(this.apiUrl,body).subscribe((result: any) => {
      if (!result || Object.keys(result).length == 0) {
        console.log("ERRORE");
      } else {
        console.log("PARTITA AGGIORNATA");
      }
    });
  }

  /**
   * @param idPartita partita di cui cerchiamo i giocatori
   * @returns litsa dei giocatori che appaertengono alla partita
   */
  getGiocatoriIscritti(idPartita:number){
    const body={partita: idPartita}
    let giocatori: string[]=[];

    this.apiUrl = environment.baseUrl + '/giocatoriIscritti';
    this.http.post(this.apiUrl,body).subscribe((result: any) => {
      if(!result){
        console.log("Errore nell'estrazione dei giocatori iscritti");
      }
      console.log("Giocatori estratti con successo");
      for(let i = 0 ; i<Object.keys(result).length ;i++) {
        console.log(result[i].nome);
        giocatori[i] = result[i].nome;
      }
    })

    return giocatori;
  }

  getTipologieCampo(){
    this.apiUrl = environment.baseUrl+'/gettipicampo';
    let tipiCampoList:string[] = [];

    this.http.post(this.apiUrl,"").subscribe((result:any) => {
      for(let i = 0; i < result.length; i ++){
        tipiCampoList[i] = JSON.parse(JSON.stringify(result[i].tipo));
      }      
    });
    return tipiCampoList;
  }

  newField(fieldInfo: string[]) {
    const body = {
      provinciaCampo: fieldInfo[0],
      tipoCampo: fieldInfo[1],
      descCampo: fieldInfo[2],
      viaCampo: fieldInfo[3]
    }
    
    this.apiUrl = environment.baseUrl+'/newfield';

    this.http.post(this.apiUrl,body).subscribe((result:any) => {
      console.log(result);
    });
  }
}
