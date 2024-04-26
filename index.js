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
  title: "El Arte de Vivir en una Ciudad Nueva",
  author: "Marta González",
  content:
    "Vivir en una ciudad nueva puede ser una experiencia emocionante y desafiante a la vez. Cuando llegué a Barcelona, estaba llena de entusiasmo, pero también un poco asustada. No conocía a nadie y cada calle parecía un laberinto por descubrir.\n\nAl principio, todo era desconocido. Tenía que aprender a moverme por la ciudad, descubrir lugares para hacer compras, y encontrar lugares agradables para pasar el tiempo. Pero con cada día que pasaba, me sentía más a gusto y más segura. Aprendí a disfrutar de los pequeños detalles, como tomar café en una plaza o escuchar a los músicos callejeros.\n\nUno de los mayores desafíos fue hacer amigos. Sin embargo, Barcelona es una ciudad vibrante y acogedora, llena de personas abiertas y amistosas. Empecé a unirme a grupos de intereses comunes, como clases de cocina y excursiones por la ciudad, y pronto hice amigos que me hicieron sentir en casa.\n\nLa clave para adaptarse a una ciudad nueva es tener paciencia y ser abierto a nuevas experiencias. Con el tiempo, dejé de sentirme una extraña y comencé a apreciar la riqueza cultural y la diversidad que ofrece Barcelona. Hoy, después de un año, me siento parte de la ciudad y no puedo imaginarme viviendo en otro lugar.\n\nSi estás pensando en mudarte a una ciudad nueva, mi consejo es que abraces el cambio y te permitas disfrutar de la aventura. Cada día es una oportunidad para aprender y crecer, y con el tiempo, esa ciudad desconocida se convertirá en tu hogar.",
  date: `April 25, 2024`,
});

blogs.push({
  title: "El Poder de la Disciplina",
  author: "Carlos Ruiz",
  content:
    "Desde pequeño, siempre fui una persona con grandes sueños y aspiraciones, pero me costaba mucho mantener la disciplina para lograrlos. Veía a personas exitosas y me preguntaba cuál era su secreto. Fue entonces cuando decidí hacer un cambio en mi vida y trabajar en mi autodisciplina.\n\nAl principio, establecer rutinas y hábitos consistentes fue complicado. Me propuse levantarme temprano cada mañana para hacer ejercicio y dedicar tiempo a mis proyectos personales. La clave para mantener el ritmo fue establecer objetivos claros y alcanzables, además de celebrar los pequeños logros a lo largo del camino.\n\nCon el tiempo, empecé a notar cambios significativos. Mi productividad aumentó y me sentía más motivado para enfrentar los desafíos diarios. Descubrí que la disciplina no es solo hacer cosas porque debes, sino porque quieres alcanzar algo más grande. Esto me llevó a obtener un ascenso en el trabajo y a cumplir metas personales que antes parecían inalcanzables.\n\nLa disciplina también me enseñó a ser más consciente de mis decisiones. Cada acción tiene un impacto, y cuanto más consistentes somos, más nos acercamos a nuestros objetivos. Por ejemplo, al adoptar hábitos saludables, no solo mejoré mi salud física, sino también mi bienestar emocional.\n\nHoy, puedo decir que la disciplina es uno de los pilares fundamentales para alcanzar el éxito. No importa qué quieras lograr, siempre es posible con dedicación y constancia. Si estás luchando con la disciplina, mi consejo es que comiences poco a poco y te rodees de personas que te inspiren a seguir adelante. No hay mejor momento que ahora para empezar tu camino hacia el éxito.",
  date: `April 26, 2024`,
});

console.log(blogs);
