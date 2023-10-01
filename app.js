const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Abhishek');
});

server.listen(4000);