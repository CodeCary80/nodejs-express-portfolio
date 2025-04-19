const express = require("express");
const router = express.Router();
const skillModel = require("./model");

const { 
    getAllSkills, 
    getAdminPage,
    addSkill,
    deleteSkill 
} = require("./controller");


router.get("/", getAllSkills);

router.get("/admin", getAdminPage);
router.post("/add", addSkill);
router.post("/delete/:id", deleteSkill);

router.get("/api", async (req, res) => {
        const skills = await skillModel.getSkills();
        res.json(skills);
});

module.exports = router;