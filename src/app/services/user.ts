export class User {
    nome: string;
    email: string;    
    provincia: string;
    bio: string;

    constructor(nome:string,email:string,provincia:string,bio:string) {
        this.nome = nome;
        this.email = email;
        this.provincia = provincia;
        this.bio = bio;
    }

    toStringUserData(){
        console.log("DATI UTENTE\n nome "+this.nome+"\nemail "+this.email+"\nprovincia "+this.provincia+"\nbio "+this.bio);
    }

}
