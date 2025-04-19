const mongoose = require("mongoose");
const db = require("../../db");

const SkillSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String
});

const Skill = mongoose.model("Skill", SkillSchema);

//Get all projects from the projects collection
async function getSkills() {
    await db.connect();
    return await Skill.find({});//return array for find all
}

async function initializeSkills() {
    const skillsList = [
        {
            name: "Node.js & Express",
            category: "Backend",
            description: "Building RESTful APIs and web applications using Node.js and Express framework",
        },
        {
            name: "ASP.NET Core",
            category: "Backend",
            description: "Developing enterprise applications with C# and ASP.NET Core MVC",
        },
        {
            name: "MongoDB",
            category: "Database",
            description: "Database design and implementation using MongoDB for web applications",
        },
        {
            name: "React",
            category: "Frontend",
            description: "Creating responsive and interactive user interfaces with React",
        }
    ];
    await Skill.insertMany(skillsList);
}

async function addSkill(name, category, proficiency, yearsOfExperience) {
    await db.connect();
    let newSkill = new Skill({
        name,
        category,
    });
    return await newSkill.save();
}

async function deleteSkillByName(name) {
    await db.connect();
    return await Skill.deleteOne({ name: name });
}

module.exports = {
    getSkills,
    addSkill,
    deleteSkillByName,
    initializeSkills
};