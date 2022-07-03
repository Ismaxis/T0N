const express = require('express');
const ton = require('./ton/tonFuncs');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

var isDeployed = 0;
var id = 0;
var validState = null;

app.use(express.static('public'))
app.use(express.urlencoded());
app.use(bodyParser.json())

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

app.post('/deploy', async (req, res) => {
  res.redirect('/');
  if(req.body.deploycheck && isDeployed == 0)
  {
    var result = await ton.init();
    validState = result[0];
    id = result[1];
    isDeployed = 1;
  }
});

app.post('/addstate', async (req, res) => {
  res.redirect('/investor');
  var amount = Number(req.body.amount);
  if(amount != 0 && Number.isInteger(amount)) {
    if(isDeployed == 1)
    {
      console.log(amount);
      validState = await ton.addState(validState, [amount, amount], id);
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
    }
  }
});


app.listen(port);