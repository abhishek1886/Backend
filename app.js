const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("Hello from the other side");
  next();
});
app.use((req, res, next) => {
  console.log("Hello from the other middleWare");
  res.send("<h1>Hello from Express</h1>");
});

app.listen(3000);
