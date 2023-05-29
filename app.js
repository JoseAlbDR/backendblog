const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Get root page (index)
app.get("/", (req, res) => {
  res.render(__dirname + "/views/index");
});

// Get about page
app.get("/about", (req, res) => {
  res.render(__dirname + "/views/about");
});

app.use(express.static(__dirname + "/public"));
app.listen(port, () => console.log(`Server running in port: ${port}`));
