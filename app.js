import "dotenv/config";
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
import { marked } from "marked";
import DOMPurify from "dompurify";
import jsdom from "jsdom";

const { JSDOM } = jsdom;
const dompurify = DOMPurify(new JSDOM().window);
const { urlencoded } = pkg;
const port = 3000;

// Replacing __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connection to database
const dbConnect = async function () {
  try {
    await mongoose.connect(
      `mongodb+srv://jadr:${process.env.PASS}@cluster0.en3wbp7.mongodb.net/blogDB`
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
postSchema.pre("validate", function (next) {
  if (this.content) {
    console.log("triggered...");
    marked.use({
      mangle: false,
      headerIds: false,
    });
    this.set("content", dompurify.sanitize(marked(this.content)));
    console.log("content " + this.content);
  }
  next();
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

// Express
const app = express();
app.use(urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Post request
app.post("/", async (req, res) => {
  const postData = await loadDB();
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
app.post("/compose", async (req, res) => {
  const rawData = req.body;
  const postData = await loadDB();
  rawData.bgImg = req.body.bgImg || blogData.bgImg;
  rawData.id = postData.length;
  rawData.postDate = getDate();
  const post = new Post(rawData);

  post.save();
  // const data = await Post.findOne({ postTitle: rawData.postTitle });

  res.redirect("/");
});

// Get request
// Route to root page (index)
app.get("/", async (req, res) => {
  const postData = await loadDB();
  res.render("home", {
    postData: postData,
    data: homeData,
    blogData: blogData,
    _: _,
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
app.get("/posts/:id/:title", async (req, res) => {
  const postData = await loadDB();
  console.log(postData);

  const id = req.params.id;
  res.render("post", {
    data: postData[id],
    id: id,
    blogData: blogData,
    postData: postData,
  });
});

// Route to post page
// app.get("/last-post", (req, res) => {
//   // Default data
//   const postData = loadDB();
//   if (postData.length === 0) {
//     res.render("post", {
//       data: blogData,
//       blogData: blogData,
//       title: blogData.defaultPost,
//       subtitle: "",
//       postData: [{ content: "Aun no hay post." }],
//       id: 0,
//     });

//     // Last post data
//   } else {
//     res.render("post", {
//       postData: postData,
//       blogData: blogData,
//       id: postData.length - 1,
//       data: postData[postData.length - 1],
//     });
//   }
// });

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
