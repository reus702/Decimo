export class Partita {
    personeMancanti:number;
    descrizione: string;    
    provincia: string;
    tipo: string;
    orario:Date;

    constructor(descrizione:string,provincia:string,tipo:string,n:number,or:Date) {
        this.descrizione = descrizione;
        this.provincia = provincia;
        this.tipo = tipo;
        this.personeMancanti = n;
        this.orario = or;
    }

    toStringUserData(){
        console.log("DATI UTENTE\n descrizione "+this.descrizione+"\tipo campo "+this.tipo+"\persone mancanti "+this.personeMancanti);
    }

}