import express from "express";
import pkg from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import {
  postData,
  aboutData,
  homeData,
  contactData,
} from "./public/js/data.js";

const { urlencoded } = pkg;
const port = 3000;

// Replacing __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(urlencoded({ extended: true }));
app.set("view engine", "ejs");

let id;

app.post("/", (req, res) => {
  id = req.body.id;
  res.redirect("/post");
});

// Route to root page (index)
app.get("/", (req, res) => {
  // console.log(postData);

  res.render("home", {
    bgImg: homeData.bgImg,
    postData: postData,
    title: homeData.title,
    subtitle: homeData.subtitle,
  });
});

// Route to about page
app.get("/about", (req, res) => {
  res.render("about", {
    bgImg: aboutData.bgImg,
    title: aboutData.title,
    subtitle: aboutData.subtitle,
    content: aboutData.content,
  });
});

// Route to contact page
app.get("/contact", (req, res) => {
  res.render("contact", {
    bgImg: contactData.bgImg,
    title: contactData.title,
    subtitle: contactData.subtitle,
  });
});

// Route to post page
app.get("/post", (req, res) => {
  res.render("post", {
    bgImg: postData[id || 0].bgImg,
    postData: postData,
    title: postData[id || 0].postTitle,
    subtitle: postData[id || 0].postSubtitle,
    id: id || 0,
  });
});

// Route to compose page
app.get("/compose", (req, res) => {
  res.render(__dirname + "/views/compose");
});

// Public dir
app.use(express.static(__dirname + "/public"));
app.listen(port, () => console.log(`Server running in port: ${port}`));
