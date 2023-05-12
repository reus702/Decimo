const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { userInfo } = require('os');
const bcrypt = require("bcrypt");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'decimodb'
});

const secret = "aWXZOwI4GlhosrHJOsVePzIYOhZRwGmO"

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database', error);
  } else {
    console.log('Connected to MySQL database');
  }
});

/*
/ Questo metodo registra un utente all'applicazione
*/
app.post('/api/signup', (req, res) => {
  let userpass = req.body.password + secret;
  console.log(userpass);
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(userpass, salt, function(err, hash) {
        connection.query('INSERT INTO `utenti`(`email`, `password`, `salt`, `nome`, `bio`, `provincia`)  VALUES ("'+req.body.email+'","'+hash+'","'+salt+'","'+req.body.nome+'","","'+req.body.provincia+'")', (error, results) => {
          if (error) {
            console.error('Error executing MySQL query', error);
            res.status(500).send('Error executing MySQL query');
          } else {
            console.log('Utente registrato!');
            res.json(results);
          }
        });
      });
    })
  
});

/*
/ Questo metodo verifica dati di login di un utente
*/
app.post('/api/login', (req, res) => {
  connection.query('SELECT * FROM utenti WHERE `email` = "'+req.body.email+'"', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query', error);
      res.status(500).send('Error executing MySQL query');
    } else {
      let userpass = req.body.password + secret;
      bcrypt.hash(userpass, results[0].salt, function(err, hash) {
        if(hash == results[0].password){
          console.log('Utente verificato!');
          res.json(results);
        }else{
          res.status(500).send('password errata');
        }
      });
    }
  });
});

/*
/ Questo metodo salva la nuova partita nel db
*/
app.post('/api/newgame', (req, res) => {
  connection.query('INSERT INTO `partite`(`organizzatore`, `persone_mancanti`,  `campo`, `descrizione`, `orario`) VALUES ("'+req.body.emailUser+'",'+req.body.giocatoriRimanenti+', "'+req.body.campo+'", "'+req.body.infoPartita+'","'+req.body.dataPartita+'")', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query', error);
      res.status(500).send('Error executing MySQL query');
    } else {
      console.log('Partita registrata!');
      res.json(results);
    }
  });
});

/*
/ Questo metodo restituisce la lista completa delle province per combo box
*/
app.post('/api/getprov', (req,res) => {
  connection.query('SELECT provincia FROM provReg ORDER BY provincia', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query', error);
      res.status(500).send('Error executing MySQL query');
    } else {
      console.log("Province trovate")
      res.json(results);
    }
  });
});

/*
/ Questo metodo restituisce le partite presenti di una provincia passata
*/
app.post('/api/campiPerProvincia', (req, res) => {

  connection.query('SELECT p.* FROM partite as p INNER JOIN campi as c ON c.descrizione = p.campo WHERE c.provincia = "'+req.body.provincia+'" AND p.orario >= CURRENT_TIMESTAMP AND p.persone_mancanti>=0', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query', error);
      res.status(500).send('Error executing MySQL query');
    } else {
      res.json(results);
    }
  });
});

/*
/ Questo metodo cerca una partita per parola chiave
*/
app.post('/api/ricercaPartite', (req, res) => {
  connection.query('SELECT DISTINCT * FROM `partite` INNER JOIN `campi` ON  `partite`.campo = `campi`.descrizione WHERE  persone_mancanti>=0 AND orario >= CURRENT_TIMESTAMP AND (`organizzatore` = "'+req.body.ricerca+'" OR `campo` = "'+req.body.ricerca+'"  OR  `campi`.`descrizione`  = "'+req.body.ricerca+'" OR campi.provincia ="'+req.body.ricerca+'") ', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query', error);
      res.status(500).send('Error executing MySQL query');
    } else {
      res.json(results);
    }
  });
});

/*
/ Questo metodo ricerca le partite fatte da un singolo giocatore
*/
app.post('/api/ricercaPartiteGiocate', (req, res) => {
  //connection.query('SELECT * FROM `partite_giocatore` WHERE `giocatore` = "'+req.body.userEmail+'" ', (error, results) => {
  connection.query('SELECT * FROM `partite` as p,`partite_giocatore` as pg, campi as c WHERE pg.`giocatore` = "'+req.body.userEmail+'" AND pg.`partita` = p.`id` AND c.`descrizione` = p.`campo`;', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query', error);
      res.status(500).send('Error executing MySQL query');
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

/*
/ Questo metodo restituisce i campi presenti nella provincia passata
*/
app.post('/api/campiProvincia', (req, res) => {
  connection.query('SELECT `descrizione` FROM `campi` WHERE `provincia`="'+req.body.provincia+'";', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query', error);
      res.status(500).send('Error executing MySQL query');
    } else {
      res.json(results);
    }
  });
});
/*
/ Questo metodo salva i giocatore che partecipano a una partita nel db
*/
app.post('/api/inserisciPartitaGiocatore', (req, res) => {
  connection.query('INSERT INTO `partite_giocatore`(`giocatore`, `partita`) VALUES ("'+req.body.userEmail+'","'+req.body.idPartita+'")', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query', error);
      res.status(500).send('Error executing MySQL query');
    } else {
      res.json(results);
    }
  });
});
app.post('/api/updateGiocatoriMancanti', (req, res) => {
  connection.query('UPDATE partite SET `persone_mancanti` = "'+req.body.personeMancanti+'"  WHERE `id` = "'+req.body.id+'"', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query', error);
      res.status(500).send('Error executing MySQL query');
    } else {
      res.json(results);
    }
  });
});

app.listen(3000, () => {
  console.log('API server listening on port 3000');
});

