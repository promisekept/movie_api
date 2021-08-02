// import * as http from "http";
const http = require("http"),
  url = require("url"),
  fs = require("fs");
http
  .createServer((req, res) => {
    let adr = req.url;
    let parsedAdr = url.parse(adr, true);
    filepath = "";
    if (parsedAdr.pathname.includes("documentation")) {
      filepath = `${__dirname}/documentation.html`;
    } else {
      filepath = "index.html";
    }
    if (!adr.includes("server") && !adr.includes("favicon")) {
      fs.appendFile(
        "log.txt",
        `URL: ${adr}
         Timestamp: ${new Date()}
        
        `,
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
    }
    fs.readFile(filepath, (err, data) => {
      if (err) {
        throw err;
      }
      res.writeHead(200, { "Content-type": "text/html" });
      res.write(data);
      res.end();
    });
  })
  .listen(8080);
console.log(`The server is up and running`);
