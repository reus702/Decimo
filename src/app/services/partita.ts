export class Partita {
    personeMancanti:number;
    descrizione: string;    
    provincia: string;
    tipo: string;

    constructor(descrizione:string,provincia:string,tipo:string,n:number) {
        this.descrizione = descrizione;
        this.provincia = provincia;
        this.tipo = tipo;
        this.personeMancanti = n;
    }

    toStringUserData(){
        console.log("DATI UTENTE\n descrizione "+this.descrizione+"\tipo campo "+this.tipo+"\persone mancanti "+this.personeMancanti);
    }

}