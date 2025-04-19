const express = require("express");
const path = require("path"); //needed when setting up static/file paths
const sessions = require("express-session");

const dotenv = require("dotenv");

//load the environment variables from .env
dotenv.config();

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

//set up application template engine
app.set("views", path.join(__dirname, "views")); //the first "views" is the setting name
//the second value above is the path: __dirname/views
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

//USE PAGE ROUTES FROM ROUTER(S)
app.use("/projects", require("./components/Project/route"));
app.use("/skills", require("./components/Skill/route"));


app.get("/", (req, res) => {
  res.redirect("/projects");
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
}); 

