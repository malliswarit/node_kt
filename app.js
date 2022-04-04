let express = require("express");
let fs = require("fs");
let morgan = require("morgan");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 9600;
let menu = [
  { link: "/", name: "Home" },
  { link: "/category", name: "Category" },
  { link: "/products", name: "Products" },
];

let productRouter = require("./src/router/productRouter")(menu);
let categoryRouter = require("./src/router/categoryRouter")(menu);
app.use(morgan("common", { stream: fs.createWriteStream("./app.log") }));

app.use("/products", productRouter);
app.use("/category", categoryRouter);

//Static Files

app.use(express.static(__dirname + "/public"));

//html file path

app.set("views", "./src/views");

//View Engine

app.set("view engine", "ejs");

// app.get("/", function (req, res) {
//   res.send("Jai Jai Rama Krishna Hare Jai Jai Rama Krishna Hare");
// });

let catData = [
  {
    id: 1,
    name: "Shopping",
    image: "https://i.ibb.co/56VP0Fn/cloths.jpg",
    link: "/category",
  },
  {
    id: 2,
    name: "Restaurants",
    image:
      "https://b.zmtcdn.com/data/pictures/chains/3/6303/640252389ddc3f264dd0e9f2741e73cd.jpg",
    link: "/restaurants",
  },
];

app.get("/", function (req, res) {
  res.render("index", { title: "Home Page", data: catData, menu });
});

app.listen(PORT, () => `Server is listening on ${PORT}`);
