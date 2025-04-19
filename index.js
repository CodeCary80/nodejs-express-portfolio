const express = require("express");
const path = require("path");
const sessions = require("express-session");
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";


app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:8888',
      'https://nodejs-express-portfolio.onrender.com',
      'https://build-nu-two.vercel.app'  
    ];
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

//set up application template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

//set up app to use sessions
app.use(
  sessions({
    secret: process.env.SESSIONSECRET,
    name: "MyUniqueSessID",
    saveUninitialized: false,
    resave: false,
    cookie:{}
  })
);


app.use("/projects", require("./components/Project/route"));
app.use("/skills", require("./components/Skill/route"));

app.get("/", (req, res) => {
  res.redirect("/projects");
});


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});