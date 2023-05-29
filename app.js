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
let id;

app.post("/", (req, res) => {
  id = req.body.id;
  res.redirect("/post");
});

// Route to root page (index)
app.get("/", (req, res) => {
  // console.log(postData);

  res.render("home", {
    bgImg: "home-bg.jpg",
    postData: postData,
    title: "Blog J.Alberto Delgado",
    subtitle: "Aquí ire dejando dichas mis cositas.",
  });
});

// Route to about page
app.get("/about", (req, res) => {
  res.render("about", {
    bgImg: "about-bg.jpg",
    title: "Sobre Mí.",
    subtitle: "Algunas cosillas sobre mi",
  });
});

// Route to contact page
app.get("/contact", (req, res) => {
  res.render("contact", {
    bgImg: "contact-bg.jpg",
    title: "Contacta conmigo.",
    subtitle:
      "Rellena el formulario y me pondré en contacto contigo lo antes posible.",
  });
});

// Route to post page
app.get("/post", (req, res) => {
  res.render("post", {
    bgImg: postData[id].bgImg,
    postData: postData,
    title: postData[id].postTitle,
    subtitle: postData[id].postSubtitle,
    id: id,
  });
});

// Route to compose page
app.get("/compose", (req, res) => {
  res.render(__dirname + "/views/compose");
});

app.use(express.static(__dirname + "/public"));
app.listen(port, () => console.log(`Server running in port: ${port}`));
