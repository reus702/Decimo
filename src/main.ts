import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import "reflect-metadata";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));


  // import mysql from 'mysql2/promise';

  // async function connect() {
  //   try {
  //     const config = {
  //       host: 'localhost',
  //       user: 'root',
  //       password: 'password',
  //       database: 'nome-del-tuo-database',
  //       port: 3306
  //     };
  //     const connection = await mysql.createConnection(config);
  //     console.log('Connessione al database MySQL riuscita!');
  //     return connection;
  //   } catch (error) {
  //     console.error('Errore di connessione al database MySQL:', error);
  //   }
  // }
  
  // // utilizza la funzione connect() per connetterti al database
  // const connection = await connect();