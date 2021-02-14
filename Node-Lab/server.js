const quotes = require("./quotes");

"use strict";
const http = require("http");
const port = 3000;

http.createServer((req, res) => {
    const index = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[index];
    // console.log(randomQuote);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h2>${randomQuote}</h2>`);
    res.end();
  })
  .listen(port);
console.log("Listening on port http://localhost:" + port);