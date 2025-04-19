const skillModel = require("./model");

const getAllSkills = async (request, response) => {
    let skills = await skillModel.getSkills();
    if (!skills || skills.length === 0) {
        await skillModel.initializeSkills();
        skills = await skillModel.getSkills();
    }
    response.render("Skill/skill", { skills });
};

const getAdminPage = async (request, response) => {
    let skills = await skillModel.getSkills();
    response.render("skill/admin", { skills });
};

const addSkill = async (request, response) => {
    const { name, category, description, isHighlight } = request.body;
    await skillModel.addSkill(name, category, description, isHighlight === 'on');
    response.redirect("/skills/admin");
};

const deleteSkill = async (request, response) => {
    const { id } = request.params;
    await skillModel.deleteSkillById(id);
    response.redirect("/skills/admin");
};

module.exports = {
    getAllSkills,
    getAdminPage,
    addSkill,
    deleteSkill
};