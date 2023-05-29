const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Route to root page (index)
app.get("/", (req, res) => {
  res.render(__dirname + "/views/index");
});

// Route to about page
app.get("/about", (req, res) => {
  res.render(__dirname + "/views/about");
});

// Route to contact page
app.get("/contact", (req, res) => {
  res.render(__dirname + "/views/contact");
});
app.use(express.static(__dirname + "/public"));
app.listen(port, () => console.log(`Server running in port: ${port}`));
