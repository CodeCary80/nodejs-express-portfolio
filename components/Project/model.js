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
        title: "Custom LMS Interface",
        description: "Developed a comprehensive course management interface for an educational platform featuring custom course card layouts, advanced search functionality, and streamlined navigation systems.",
        img: "/img/myplaceinthisworld.png", 
        link: "https://myplaceinthisworld.ca/highschool-division/",
      },
      {
        title: "Chillax Pack",
        description: "A full-stack web application that generates personalized evening plans for Toronto residents by intelligently pairing restaurants with activities based on user preferences including budget, group size, energy level, and dining preferences. The platform features user authentication, favorites management, rating system, and a comprehensive admin dashboard for content management.",
        img: "/img/chillaxpack.png",  
        link: "https://github.com/CodeCary80/obviousplan",
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