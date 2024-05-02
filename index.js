import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

//Mostrar la página con los blogs
app.get("/allBlogs", (req, res) => {
  res.render("blogsPage.ejs", { blogs: blogs });
});

//Mostrar el formulario para crear el blog
app.get("/writeBlog", (req, res) => {
  res.render("blogs.ejs");
});

// Visualizar un formulario determinado
app.get("/view-blog", (req, res) => {
  // Convertir el índice de la consulta a número entero
  const blogIndex = parseInt(req.query.blogIndex, 10);

  // Validación del índice para evitar errores
  if (isNaN(blogIndex) || blogIndex < 0 || blogIndex >= blogs.length) {
    res.status(404).send("Blog no encontrado"); // Error si el índice es inválido
  } else {
    const blog = blogs[blogIndex]; // Obteniendo el blog del índice correspondiente

    const escapeHTML = (str) => {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    // Escapar el contenido del blog para evitar interpretaciones incorrectas
    const escapedContent = escapeHTML(blog.content);

    // Reemplazar saltos de línea por <br> para conservar el formato
    const formattedContent = escapedContent.replace(/\n/g, "<br>");

    // Enviando el contenido del blog al usuario
    res.render("viewBlog.ejs", {
      title: blog.title,
      author: blog.author,
      date: blog.date,
      content: formattedContent,
    });
  }
});

//Crear un blog nuevo
app.post("/blog", (req, res) => {
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

//Mostrar la información del blog que se desea editar
let blogEditIndex;
app.post("/editPage", (req, res) => {
  blogEditIndex = req.body["blogIndex"];
  // Buscar el blog a editar
  const blogEdit = blogs.slice(blogEditIndex)[0];
  res.render("blogs.ejs", { blogEdit: blogEdit });
});

//Editar el blog especificado
app.post("/editBlog", (req, res) => {
  const blogToEdit = blogs[blogEditIndex];
  //Actualizar el blog con los nuevos cambios
  blogToEdit.title = req.body["title"];
  blogToEdit.author = req.body["author"];
  blogToEdit.content = req.body["content"];
  res.render("blogsPage.ejs", { blogs: blogs });
});

//Eliminar blog
app.post("/delete-blog", (req, res) => {
  const blogIndex = req.body["blogIndex"];
  // Eliminar el blog del arreglo
  blogs.splice(blogIndex, 1);
  res.render("blogsPage.ejs", { blogs: blogs });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const date = new Date();

//Crear blogs de pruebas
const blogs = [];
blogs.push({
  title: "The Art of Living in a New City",
  author: "Marta González",
  content:
    "Living in a new city can be both exciting and challenging. When I arrived in Barcelona, I was full of enthusiasm, but also a little scared. I didn't know anyone, and every street seemed like a maze waiting to be explored.\n\nAt first, everything was unfamiliar. I had to learn to navigate the city, find places to shop, and discover enjoyable spots to spend time. But as each day passed, I felt more comfortable and confident. I learned to appreciate the small details, like having coffee in a square or listening to street musicians.\n\nOne of the biggest challenges was making friends. However, Barcelona is a vibrant and welcoming city, filled with open and friendly people. I started joining groups with common interests, like cooking classes and city tours, and soon made friends who made me feel at home.\n\nThe key to adapting to a new city is patience and being open to new experiences. Over time, I stopped feeling like a stranger and began to appreciate the cultural richness and diversity that Barcelona offers. Today, after a year, I feel like part of the city and can't imagine living anywhere else.\n\nIf you're thinking about moving to a new city, my advice is to embrace the change and allow yourself to enjoy the adventure. Each day is an opportunity to learn and grow, and over time, that unknown city will become your home.",
  date: `April 25, 2024`,
});

blogs.push({
  title: "The Power of Discipline",
  author: "Carlos Ruiz",
  content:
    "Since I was a kid, I always had big dreams and aspirations, but I found it difficult to maintain the discipline to achieve them. I saw successful people and wondered what their secret was. That's when I decided to make a change in my life and work on my self-discipline.\n\nAt first, setting consistent routines and habits was challenging. I aimed to get up early every morning to exercise and devote time to my personal projects. The key to keeping pace was to set clear and achievable goals and celebrate the small victories along the way.\n\nOver time, I started noticing significant changes. My productivity increased, and I felt more motivated to tackle daily challenges. I discovered that discipline is not just about doing things because you have to, but because you want to achieve something greater. This led me to get a promotion at work and accomplish personal goals that once seemed out of reach.\n\nDiscipline also taught me to be more aware of my decisions. Every action has an impact, and the more consistent we are, the closer we get to our goals. For example, by adopting healthy habits, I not only improved my physical health but also my emotional well-being.\n\nToday, I can say that discipline is one of the fundamental pillars for achieving success. No matter what you want to achieve, it is always possible with dedication and consistency. If you're struggling with discipline, my advice is to start small and surround yourself with people who inspire you to keep going. There's no better time than now to start your journey toward success.",
  date: `April 26, 2024`,
});
