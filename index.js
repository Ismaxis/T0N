const express = require('express');
const ton = require('./ton/tonFuncs');
const csv = require('./scripts/csv-parse')
const csv_append = require('./scripts/csv-append')
const table_lib = require('./scripts/table')
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

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

/*
--------------------------------------------------------------------------------
investor
--------------------------------------------------------------------------------
*/

app.get('/investor', (req, res) => {
  var tables = []
  for (var i = 0; i < table_lib.last_table_num(); i++){
    tables.push(table_lib.read(i));
  }
  console.log(tables)
  res.render("investor", {messages: csv.messages(), 
  tables: tables, 
  page: req.url})
});

app.post('/investor_add_message', async (req, res) => {
  res.redirect('/investor');
  csv_append.append("Investor", req.body.new_message);
});

/*
--------------------------------------------------------------------------------
worker
--------------------------------------------------------------------------------
*/

app.get('/worker', (req, res) => {
  var tables = []
  for (var i = 0; i < table_lib.last_table_num(); i++){
    tables.push(table_lib.read(i));
  }
  console.log(tables)
  res.render("worker", {
    messages: csv.messages(), 
    tables: tables, 
    page: req.url})
});

app.post('/worker_add_message', async (req, res) => {
  res.redirect('/worker');
  if (req.body.new_message!=''){
  csv_append.append("Worker", req.body.new_message);
  }
});

app.post('/confirm_creating_table', async (req, res) => {
  res.redirect('/worker');
  var i=0
  var table = []
  while (eval(`req.body.name${i}`) != null){
    eval(`table.push([req.body.name${i}, req.body.cost${i}])`)
    i++
  }
  table_lib.append(table)
});

/*
--------------------------------------------------------------------------------
crypto http
--------------------------------------------------------------------------------
*/

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