export class Partita {
    id:number
    personeMancanti:number;
    descrizione: string;    
    provincia: string;
    tipo: string;
    orario:Date;
    via:string

    constructor(id:number,descrizione:string,provincia:string,tipo:string,n:number,or:Date,via:string) {
        this.id = id;
        this.descrizione = descrizione;
        this.provincia = provincia;
        this.tipo = tipo;
        this.personeMancanti = n;
        this.orario = or;
        this.via= via;
    }

    toStringUserData(){
        console.log("DATI UTENTE\n descrizione "+this.descrizione+"\tipo campo "+this.tipo+"\persone mancanti "+this.personeMancanti);
    }

}