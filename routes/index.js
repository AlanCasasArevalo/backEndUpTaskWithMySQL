var express = require('express');
var router = express.Router();
const { body } = require('express-validator/check');
const projectsController = require('../controllers/projectsController');

module.exports = function () {
  router.get('/', projectsController.projectsHome );
  router.get('/new-projects', projectsController.projectsNewProjects );
  router.post('/new-projects',
      body('name').not().isEmpty().trim().escape(),
      projectsController.newProject
  );

  return router
};