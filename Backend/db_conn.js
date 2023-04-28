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

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database', error);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.post('/api/signup', (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        connection.query('INSERT INTO `utenti`(`email`, `password`, `salt`, `nome`, `bio`, `provincia`) VALUES ("'+req.body.email+'","'+hash+'","'+salt+'","'+req.body.nome+'","","'+req.body.provincia+'")', (error, results) => {
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

app.post('/api/login', (req, res) => {
  connection.query('SELECT * FROM utenti WHERE `email` = "'+req.body.email+'"', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query', error);
      res.status(500).send('Error executing MySQL query');
    } else {
      bcrypt.hash(req.body.password, results[0].salt, function(err, hash) {
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

app.post('/api/newgame', (req, res) => {
  connection.query('INSERT INTO `partite`(`organizzatore`, `persone_mancanti`, `descrizione`, `orario`) VALUES ("'+req.body.emailUser+'",'+req.body.giocatoriRimanenti+',"'+req.body.infoPartita+'","'+req.body.dataPartita+'")', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query', error);
      res.status(500).send('Error executing MySQL query');
    } else {
      console.log('Partita registrata!');
      res.json(results);
    }
  });
});

app.post('/api/getprov', (req,res) => {
  console.log("Sono prima della query prov");
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

app.post('/api/campiPerProvincia', (req, res) => {
  connection.query('SELECT * FROM utenti WHERE `partite` = "'+req.provincia+'" ', (error, results) => {
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
