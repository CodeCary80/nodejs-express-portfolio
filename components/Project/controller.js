const projectModel = require("./model");

 // If no projects found, initialize with default data
const getAllProjects = async (request, response) => {
    let projects = await projectModel.getProjects();

    //console.log("Projects data:", projects);--validatiing paths when image not found on page

    if (!projects || projects.length === 0) {
    await projectModel.initializeProjects();
    projects = await projectModel.getProjects();
}
    response.render("Project/project", { projects });
};

const initializeProjectData = async (request, response) => {
        await projectModel.initializeProjects();
        response.json({ message: "Projects initialized successfully" });   
};

const getAdminPage = async (request, response) => {
    let projects = await projectModel.getProjects();
    response.render("project/admin", { projects });
};

const addProject = async (request, response) => {
    const { title, description, img, link, technologies } = request.body;
    
    // Split technologies string into an array
    const techArray = technologies 
        ? technologies.split(',').map(tech => tech.trim()) 
        : [];

    await projectModel.addProjects(
        title, 
        description, 
        img, 
        link, 
        techArray
    );
    response.redirect("/projects/admin");
};

const deleteProject = async (request, response) => {
    const { id } = request.params;
    await projectModel.deleteProjectById(id);
    response.redirect("/projects/admin");
};

module.exports = { 
    getAllProjects,
    initializeProjectData,
    getAdminPage,
    addProject,
    deleteProject
};