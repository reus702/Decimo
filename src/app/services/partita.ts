export class Partita {
    id:number
    personeMancanti:number;
    descrizione: string;    
    provincia: string;
    tipo: string;
    orario:Date;
    via:string
    nomeCampo: string;

    constructor(id:number,descrizione:string,provincia:string,tipo:string,personeMancanti:number,orario:Date,via:string, nomeCampo: string) {
        this.id = id;
        this.descrizione = descrizione;
        this.provincia = provincia;
        this.tipo = tipo;
        this.personeMancanti = personeMancanti;
        this.orario = orario;
        this.via= via;
        this.nomeCampo = nomeCampo;
    }

    toStringDatiPartita(){
        console.log("descrizione: "+this.descrizione+" tipo campo: "+this.tipo+" persone mancanti: "+this.personeMancanti);
    }

}