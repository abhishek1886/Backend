const express = require("express");
const fs = require("fs");

const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/login', (req, res, next) => {
  res.send(`<form onSubmit="localStorage.setItem('username', document.getElementById('username').value); console.log('test');" action='/login' method='POST'><input type='text' id='username' name='username' placeholder='username' /><button type='submit'>Login</button></form>`);
})

app.post('/login', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
})

// app.use('/message', (req, res, next) => {
//   const message = req.body;
// })

app.get('/', (req, res) => {
  let messages = fs.readFileSync("./messages.txt", "utf-8");
  if(!messages) {
    messages = "No messages to show!";
  }

  res.send(`<html>
    <body>
      <pre>${messages}</pre>
      <form onSubmit="document.getElementById('username').value = localStorage.getItem('username');" action='/' method='POST'>
        <input type='hidden' id='username' name='username' />
        <input type='text' name='message' />
        <button type='submit'>Send</button>
      </form>
    </body>
  </html>`);
})

app.post('/', (req, res) => {
  console.log(req.body);
  fs.appendFileSync("./messages.txt", `${req.body.username} : ${req.body.message} \n`);
  res.redirect('/');
})

app.listen(3000);
