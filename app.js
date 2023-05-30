import express from "express";
import pkg from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import _ from "lodash";
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
    const id = req.body.id.split(",")[0];
    const title = _.lowerCase(req.body.id.split(",")[1]).split(" ").join("-");
    // Go to the post clicked
    res.redirect(`/posts/${id}/${title}`);
  }
});

// Compose new post
app.post("/compose", (req, res) => {
  const data = req.body;
  data.bgImg = req.body.bgImg || blogData.bgImg;
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
    postData: postData,
    data: homeData,
    blogData: blogData,
  });
});

// Route to about page
app.get("/about", (req, res) => {
  res.render("about", {
    data: aboutData,
    blogData: blogData,
  });
});

// Route to contact page
app.get("/contact", (req, res) => {
  res.render("contact", {
    data: contactData,
    blogData: blogData,
  });
});

// Route to post by id
app.get("/posts/:id/:title", (req, res) => {
  const id = req.params.id;
  res.render("post", {
    data: postData[id],
    id: id,
    blogData: blogData,
    postData: postData,
  });
});

// Route to post page
app.get("/post", (req, res) => {
  // Default data
  if (postData.length === 0) {
    res.render("post", {
      data: blogData,
      blogData: blogData,
      title: blogData.defaultPost,
      subtitle: "",
      postData: [{ content: "Aun no hay post." }],
      id: 0,
    });

    // Last post data
  } else {
    res.render("post", {
      postData: postData,
      blogData: blogData,
      id: postData.length - 1,
      data: postData[postData.length - 1],
    });
  }
});

// Route to external link
app.get("/portfolio", (req, res) => {
  res.redirect(blogData.mainWebURL);
});

// Route to compose page
app.get("/compose", (req, res) => {
  res.render("compose", {
    data: composeData,
    blogData: blogData,
  });
});

// Public dir
app.use(express.static(__dirname + "/public"));
app.listen(process.env.PORT || port, () =>
  console.log(`Server running in port: ${port}`)
);
