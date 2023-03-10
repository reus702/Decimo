const express = require('express');
const mysql = require('mysql');

const app = express();

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


app.get('/api/users', (req, res) => {
    connection.query('INSERT INTO `utenti`(`email`, `password`, `nome`, `bio`, `provincia`) VALUES ("emai@ciao","passworde","diego","tortelliniallapaulodybbala","RM")', (error, results) => {
      if (error) {
        console.error('Error executing MySQL query', error);
        res.status(500).send('Error executing MySQL query');
      } else {
        console.log('Query worka');
        res.json(results);
      }
    });
});

app.listen(3000, () => {
  console.log('API server listening on port 3000');
});
