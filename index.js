const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

app.use((req, res, next) => {
  req.timeRequest = Date.now();
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/halaman", (req, res) => {
  console.log(req.timeRequest);
  res.send("Halo halaman!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
