import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/blogs", (req, res) => {
  res.render("blogsPage.ejs", { blogs: blogs });
});

app.post("/createBlog", (req, res) => {
  const newBlog = {
    title: req.body["title"],
    author: req.body["author"],
    content: req.body["content"],
    date: `${date.toLocaleString("en", {
      month: "long",
    })} ${date.getDate()}, ${date.getFullYear()}`,
  };
  blogs.push(newBlog);
  res.render("blogsPage.ejs", { blogs: blogs });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const date = new Date();

const blogs = [];
blogs.push({
  title: "Blog example 1",
  author: "Ricardo Núñez",
  content:
    "Discover the world of blogging with our platform. Share your stories, experiences, and insights with a supportive community of writers and readers. Join us today and start creating engaging content that resonates with others.",
  date: `${date.toLocaleString("en", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`,
});

blogs.push({
  title: "Blog example 2",
  author: "Antonio Lopez",
  content:
    "Discover the world of blogging with our platform. Share your stories, experiences, and insights with a supportive community of writers and readers. Join us today and start creating engaging content that resonates with others.",
  date: `${date.toLocaleString("en", {
    month: "long",
  })} ${date.getDate()}, ${date.getFullYear()}`,
});
