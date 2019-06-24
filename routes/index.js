var express = require('express');
var router = express.Router();
const { body } = require('express-validator/check');
const projectsController = require('../controllers/projectsController');
const tasksController = require('../controllers/tasksController');

module.exports = function () {

  // PROJECT
  router.get('/', projectsController.projectsHome );
  router.get('/new-projects', projectsController.projectsNewProjects );
  router.post('/new-projects',
      body('name').not().isEmpty().trim().escape(),
      projectsController.newProject
  );

  router.get('/projects/:url', projectsController.projectByUrl );

  router.get('/projects/edit/:id', projectsController.editForm );

  router.post('/new-projects/:id',
      body('name').not().isEmpty().trim().escape(),
      projectsController.updateProject
  );

  router.delete('/projects/:url',
      projectsController.deleteProject
  );

  // TASKS
  router.post('/projects/:url',
      tasksController.addNewTask
  );

  router.patch('/task/:id',
      tasksController.updateTask
  );

  return router
};