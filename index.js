const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'))

app.set('view engine', "ejs")

app.get('/', (req, res) => {
  res.render("index")
});

app.get('/investor', (req, res) => {
  res.render("investor")
});

app.get('/worker', (req, res) => {
  res.render("worker")
});

app.listen(port);