import express from "express";
import pkg from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import _ from "lodash";
import {
  aboutData,
  homeData,
  contactData,
  composeData,
  blogData,
} from "./public/js/data.js";
import { getDate } from "./public/js/utils.js";
import mongoose from "mongoose";
import { PASS } from "./private/config.js";

const { urlencoded } = pkg;
const port = 3001;

// Replacing __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connection to database
const dbConnect = async function () {
  try {
    await mongoose.connect(
      `mongodb+srv://jadr:${PASS}@cluster0.en3wbp7.mongodb.net/blogDB`
    );
    console.log("DB connection succesfull.");
  } catch (err) {
    console.log(err);
  }
};

dbConnect();
// Post data object
// {
//   postTitle: 'Title',
//   postSubtitle: 'Subtitle',
//   author: 'Author',
//   web: 'https://www.yourweb.com',
//   content: 'Content',
//   bgImg: 'background.jpg',
//   id: 0, -> id number (max postData.length)
//   postDate: 'Tuesday, May 30' -> Generated with an util
// }
const postSchema = mongoose.Schema({
  postTitle: {
    type: String,
    required: "Title can't be empty",
  },
  postSubtitle: {
    type: String,
    required: "Subtitle can't be empty",
  },
  author: {
    type: String,
    required: "Author can't be empty",
  },
  web: {
    type: String,
    required: "URL can't be empty",
    unique: true,
  },
  content: {
    type: String,
    required: "Content can't be empty",
  },
  bgImg: {
    type: String,
  },
  id: {
    type: Number,
    unique: true,
  },
  postDate: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);

const loadDB = async function () {
  try {
    const posts = await Post.find({});
    console.log("Post succesfully loaded from DB.");
    return posts;
  } catch (err) {
    console.log(err);
  }
};

const postData = await loadDB();

console.log(postData);

// Express
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
    const postTitle = _.lowerCase(req.body.id.split(",")[1])
      .split(" ")
      .join("-");
    // Go to the post clicked
    res.redirect(`/posts/${id}/${postTitle}`);
  }
});

// Compose new post
app.post("/compose", (req, res) => {
  const data = req.body;

  data.bgImg = req.body.bgImg || blogData.bgImg;
  data.id = postData.length;
  data.postDate = getDate();
  const post = new Post(data);
  post.save();
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
app.get("/last-post", (req, res) => {
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
// app.get("/compose", (req, res) => {
//   res.render("compose", {
//     data: composeData,
//     blogData: blogData,
//   });
// });

// Public dir
app.use(express.static(__dirname + "/public"));
app.listen(process.env.PORT || port, () =>
  console.log(`Server running in port: ${port}`)
);
