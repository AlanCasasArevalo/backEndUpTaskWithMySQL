var express = require('express');
var router = express.Router();
const { body } = require('express-validator/check');
const projectsController = require('../controllers/projectsController');
const tasksController = require('../controllers/tasksController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

module.exports = function () {

  // PROJECT
  router.get('/', projectsController.projectsHome );
  router.get('/new-projects',
      authController.authenticatedUser,
      projectsController.projectsNewProjects
  );

  router.post('/new-projects',
      body('name').not().isEmpty().trim().escape(),
      authController.authenticatedUser,
      projectsController.newProject
  );

  router.get('/projects/:url',
      authController.authenticatedUser,
      projectsController.projectByUrl
  );

  router.get('/projects/edit/:id',
      authController.authenticatedUser,
      projectsController.editForm
  );

  router.post('/new-projects/:id',
      authController.authenticatedUser,
      body('name').not().isEmpty().trim().escape(),
      projectsController.updateProject
  );

  router.delete('/projects/:url',
      authController.authenticatedUser,
      projectsController.deleteProject
  );

  // TASKS
  router.post('/projects/:url',
      authController.authenticatedUser,
      tasksController.addNewTask
  );

  router.patch('/task/:id',
      authController.authenticatedUser,
      tasksController.updateTask
  );

  router.delete('/task/:id',
      authController.authenticatedUser,
      tasksController.deleteTask
  );

  //USERS
  router.post('/create-account',
      userController.createNewUserAccount
  );

  //AUTH
  router.post(_constants.AUTHENTICATION_CONTROLLER.POST_AUTHENTICATION_ROUTE,
      authController.userAuthentication
  );

  return router
};