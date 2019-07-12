const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");

const hubsRouter = require("./hubs/hubs-router.js");
const gate = require("./auth/gate-middleware");

const server = express();

//MiddleWare
function logger(req, res, next) {
  console.log(`${req.method} to ${req.path}`);

  next();
}

//setup global middleware
server.use(logger);
server.use(helmet());
server.use(express.json());

server.get("/free", (req, res) => {
  res.status(200).json({ welcome: "Web 20 Developers!" });
});

server.get("/paid", gate, errorHandler, (req, res) => {
  res.status(200).json({ welcome: "To the mines of Moria" });
});

server.use("/api/hubs", gate, hubsRouter);

function addName(req, res, next) {
  const name = "Web 20 Developers";

  req.teamName = name;

  next();
}

server.get("/", addName, (req, res) => {
  const nameInsert = req.teamName ? ` ${req.teamName}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function errorHandler(error, req, res, next) {
  console.log(error);
  res.status(401).json({ you: "SHALL NOT PASS!" });
}

//error handlers have 4 parameters, rather than the usual 3
//error handlers can go anywhere in the assembly line, order is not important

module.exports = server;
