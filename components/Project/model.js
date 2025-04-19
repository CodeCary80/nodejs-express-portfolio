const mongoose = require("mongoose");
const { scryptSync } = require("crypto");

const db = require("../../db");

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    img: String,
    link: String,
    technologies: [String]
});

//Get all projects from the projects collection
const Project = mongoose.model("Project", ProjectSchema);

async function getProjects() {
    await db.connect();
    return await Project.find({}); //return array for find all
}

//Initialize projects collection with some initial data
async function initializeProjects() {
    const projectList = [
      {
        title: "Second Hand Record Web",
        description: "A web application built with Node.js, Express, and Pug that showcases second-hand vinyl records. The site features a clean, minimalist design with dynamic page rendering, category-based navigation, and a search function. Users can explore various record listings, view product details, and browse through different sections like accessories and merchandise.",
        img: "/img/record.png", 
        link: "https://github.com/CodeCary80/http5222/tree/main/second_hand-e-commerce",
      },
      {
        title: "Movie Archipelago",
        description: "A responsive web application that helps users organize and track their movie-watching experience. It allows users to categorize movies into Favorites, Watched, and Wish List, rate and review them with a 5-star system, and add personal notes. The app features automatic sorting, customizable themes, and persistent local storage to keep user data intact.",
        img: "/img/movie.png",  
        link: "https://github.com/CodeCary80/http5122/tree/main/movie_Archipelago",
        technologies: "H"
      },
      {
        title: "Itinerary Management System",
        description: "A travel planning application built with ASP.NET Core, designed to help groups efficiently organize trips and manage shared expenses. The system enables users to manage destinations, schedule group activities, and track member participation and preferences. It also handles activity scheduling while preventing conflicts and provides a streamlined way to monitor group expenses and split payments.",
        img: "/img/itinerary.png", 
        link: "https://github.com/CodeCary80/http5226/tree/main/passionproject"
      }
    ];
    await Project.insertMany(projectList);
  }

  async function addProjects(projectTitle, projectDescription, projectImg, projectLink, projectTechnologies) {
    await db.connect();
    let newProject = new Project({
        title: projectTitle,
        description: projectDescription,
        img: projectImg,
        link: projectLink,
        technologies: projectTechnologies
    });
    let result = await newProject.save();
}

  async function deleteProjectByTitle(projectTitle) {
    await db.connect();
    let result = await Project.deleteOne({ title: projectTitle });
  }


  module.exports = {
    getProjects,
    addProjects,
    deleteProjectByTitle,
    initializeProjects
  }    