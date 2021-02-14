const express = require("express");
const cart = require("./cart-items");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", cart);

app.listen(port, () => console.log(`Listening on port: ${port}.`));
console.log("http://localhost:" + port);