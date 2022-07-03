const express = require('express');
const ton = require('./ton/tonFuncs');
const csv = require('./scripts/csv-parse')

const app = express();
const port = 3000;
const bodyParser = require('body-parser');

var isDeployed = 0;
var id = 0;
var validState = null;
var balances = {balanceA: 0, balanceB: 0};

app.use(express.static('public'))
app.use(express.urlencoded());
app.use(bodyParser.json())

app.set('view engine', "ejs")

app.get('/', (req, res) => {
  res.render("index")
});

app.get('/investor', (req, res) => {
  res.render("investor", {messages: csv.messages})
});
app.post('/investor_add_message', async (req, res) => {
  //res.redirect('/investor');
  console.log(req.body.new_message);
});

app.get('/worker', (req, res) => {
  res.render("worker")
});

app.post('/deploy', async (req, res) => {
  res.redirect('/');
  if(req.body.deploycheck && isDeployed == 0)
  {
    balances.balanceA = Number(req.body.startbalance);
    var result = await ton.init(balances.balanceA);
    validState = result[0];
    id = result[1];
    isDeployed = 1;
  }
});

app.post('/addstate', async (req, res) => {
  res.redirect('/investor');
  var amount = Number(req.body.amount);
  if(amount != 0 && isNumeric(amount)) {
    if(isDeployed == 1)
    {
      balances.balanceA -= amount;
      balances.balanceB += amount;
      console.log(balances, amount);
      validState = await ton.addState(validState, balances, id);
    }
  }
});

app.post('/close', async (req, res) => {
  res.redirect('/');
  if(req.body.closecheck)
  {
    if(isDeployed == 1)
    {
      await ton.close(validState, id);
      isDeployed = 0;
      balances.balanceA = 0;
      balances.balanceB = 0;
    }
  }
});


app.listen(port);

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}