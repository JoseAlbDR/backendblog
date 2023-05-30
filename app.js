import express from "express";
import pkg from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import {
  postData,
  aboutData,
  homeData,
  contactData,
  composeData,
  blogData,
} from "./public/js/data.js";
import { getDate } from "./public/js/utils.js";

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
  console.log(req.body);
  id = req.body.id;
  res.redirect("/post");
});

// Route to root page (index)
app.get("/", (req, res) => {
  res.render("home", {
    bgImg: homeData.bgImg,
    postData: postData,
    title: homeData.title,
    subtitle: homeData.subtitle || "",
    linkedinURL: blogData.linkedinURL,
    githubURL: blogData.githubURL,
    mainWebURL: blogData.mainWebURL,
    blogOwner: blogData.blogOwner,
  });
});

// Route to about page
app.get("/about", (req, res) => {
  res.render("about", {
    bgImg: aboutData.bgImg,
    title: aboutData.title,
    subtitle: aboutData.subtitle,
    content: aboutData.content,
    linkedinURL: blogData.linkedinURL,
    githubURL: blogData.githubURL,
    mainWebURL: blogData.mainWebURL,
    blogOwner: blogData.blogOwner,
  });
});

// Route to contact page
app.get("/contact", (req, res) => {
  res.render("contact", {
    bgImg: contactData.bgImg,
    title: contactData.title,
    subtitle: contactData.subtitle,
    content: contactData.content,
    linkedinURL: blogData.linkedinURL,
    githubURL: blogData.githubURL,
    mainWebURL: blogData.mainWebURL,
    blogOwner: blogData.blogOwner,
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
    linkedinURL: blogData.linkedinURL,
    githubURL: blogData.githubURL,
    mainWebURL: blogData.mainWebURL,
    blogOwner: blogData.blogOwner,
  });
});

app.get("/portfolio", (req, res) => {
  res.redirect(blogData.mainWebURL);
});

// Route to compose page
app.get("/compose", (req, res) => {
  res.render("compose", {
    bgImg: composeData.bgImg,
    title: composeData.title,
    subtitle: composeData.subtitle,
    content: composeData.content,
    linkedinURL: blogData.linkedinURL,
    githubURL: blogData.githubURL,
    mainWebURL: blogData.mainWebURL,
    blogOwner: blogData.blogOwner,
  });
});

app.post("/compose", (req, res) => {
  const data = req.body;
  data.bgImg = req.body.bgImg || blogData.defaultImg;
  data.id = postData.length;
  data.postDate = getDate();
  postData.push(data);
  res.redirect("/");
});

// Public dir
app.use(express.static(__dirname + "/public"));
app.listen(port, () => console.log(`Server running in port: ${port}`));
