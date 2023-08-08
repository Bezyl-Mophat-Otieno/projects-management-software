const {Router} = require('express');
const { createProject, getAllProjects, getOneProject, updateProject, deleteProject } = require('../Controllers/projectsController');

const projectrouter = Router();

projectrouter.post('/', createProject);
projectrouter.get('/', getAllProjects);
projectrouter.get('/:project_id', getOneProject);
projectrouter.put('/:project_id', updateProject);
projectrouter.delete('/:project_id', deleteProject);

module.exports = {
    projectrouter
}