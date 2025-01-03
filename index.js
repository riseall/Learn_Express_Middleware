const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

app.use((req, res, next) => {
  req.timeRequest = Date.now();
  console.log(req.method, req.url);
  next();
});

const auth = (req, res, next) => {
  const { password } = req.query;
  if (password === "secret") {
    next();
  }
  res.send("Anda Perlu Memasukan Password");
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/halaman", (req, res) => {
  console.log(req.timeRequest);
  res.send("Halo halaman!");
});

app.get("/admin", auth, (req, res) => {
  res.send("Selamat Datang Admin");
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
