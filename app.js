const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    let message;
    try {
      message = fs.readFileSync("./message.txt", "utf-8");
    } catch (err) {
      console.error(err);
      message = "Error reading the file.";
    }

    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(`<body><p>${message}</p><form action="/message" method="POST" ><input type="text" name="message" /><button type="submit">Send</button></form></body>`);
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.writeHead(302, { Location: "/" });
        return res.end();
      });
    })
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My App</title></head>");
  res.write(`<body><h1>Hello</h1></body>`);
  res.write("</html>");
  res.end();
});

server.listen(4000);
