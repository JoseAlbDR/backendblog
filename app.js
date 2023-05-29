import express from "express";
import pkg from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import { postData } from "./public/js/data.js";

const { urlencoded } = pkg;
const port = 3000;
// Replacing __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(urlencoded({ extended: true }));
app.set("view engine", "ejs");
const bgImg = "home-bg.jpg";
const post = {
  bgImg: "home-bg.jpg",
};

app.get;

// Route to root page (index)
app.get("/", (req, res) => {
  // console.log(postData);

  res.render("home", {
    bgImg: "home-bg.jpg",
    postData: postData,
  });
});

// Route to about page
app.get("/about", (req, res) => {
  res.render("about", post);
});

// Route to contact page
app.get("/contact", (req, res) => {
  res.render("contact", { bgImg: "home-bg.jpg" });
});

// Route to post page
app.get("/post", (req, res) => {
  res.render("post", { bgImg: "home-bg.jpg" });
});

// Route to compose page
app.get("/compose", (req, res) => {
  res.render(__dirname + "/views/compose");
});
app.use(express.static(__dirname + "/public"));
app.listen(port, () => console.log(`Server running in port: ${port}`));
