const express = require("express");
const router = express.Router();
const projectModel = require("./model");

const { 
    getAllProjects, 
    initializeProjectData,
    getAdminPage,
    addProject,
    deleteProject 
} = require("./controller");


router.get("/", getAllProjects);
router.post("/init", initializeProjectData);

router.get("/admin", getAdminPage);
router.post("/add", addProject);
router.post("/delete/:id", deleteProject);

router.get("/api", async (req, res) => {
        const projects = await projectModel.getProjects();
        res.json(projects);
    });


module.exports = router;