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

// Post request
app.post("/", (req, res) => {
  // If there is no post, go make one
  if (postData.length === 0) {
    res.redirect("/compose");
  } else {
    // Go to the post clicked
    res.redirect(`/posts/${req.body.id}`);
  }
});

// Compose new post
app.post("/compose", (req, res) => {
  const data = req.body;
  data.bgImg = req.body.bgImg || blogData.defaultImg;
  data.id = postData.length;
  data.postDate = getDate();
  // Save post and go home
  postData.push(data);
  res.redirect("/");
});

// Get request
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
    defaultPost: blogData.defaultPost,
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

// Route to post by id
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  res.render("post", {
    bgImg: postData[id].bgImg,
    postData: postData,
    title: postData[id].postTitle,
    subtitle: postData[id].postSubtitle,
    id: id,
    linkedinURL: blogData.linkedinURL,
    githubURL: blogData.githubURL,
    mainWebURL: blogData.mainWebURL,
    blogOwner: blogData.blogOwner,
  });
});

// Route to post page
app.get("/post", (req, res) => {
  // Default data
  if (postData.length === 0) {
    res.render("post", {
      bgImg: blogData.defaultImg,
      linkedinURL: blogData.linkedinURL,
      githubURL: blogData.githubURL,
      mainWebURL: blogData.mainWebURL,
      blogOwner: blogData.blogOwner,
      title: blogData.defaultPost,
      subtitle: "",
      postData: [{ content: "Aun no hay post." }],
      id: 0,
    });
    // Last post data
  } else {
    res.render("post", {
      bgImg: postData[postData.length - 1].bgImg,
      postData: postData,
      title: postData[postData.length - 1].postTitle,
      subtitle: postData[postData.length - 1].postSubtitle,
      id: postData.length - 1,
      linkedinURL: blogData.linkedinURL,
      githubURL: blogData.githubURL,
      mainWebURL: blogData.mainWebURL,
      blogOwner: blogData.blogOwner,
    });
  }
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

// Public dir
app.use(express.static(__dirname + "/public"));
app.listen(process.env.PORT || port, () =>
  console.log(`Server running in port: ${port}`)
);
