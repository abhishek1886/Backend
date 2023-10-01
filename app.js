const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  //process.exit();
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My App</title></head>");
  res.write(
    `<body><h1>${
      req.url === "/home"
        ? "Welcome Home!"
        : req.url === "/about"
        ? "Welcome to About Us Page!"
        : req.url === "/node"
        ? "Welcome to my Node Project!"
        : ""
    }</h1></body>`
  );
  res.write("</html>");
  res.end();
});

server.listen(4000);
