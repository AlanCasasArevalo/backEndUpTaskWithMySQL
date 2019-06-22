const Projects = require('../models/Projects');

exports.projectsHome = async (req, res) => {
    const projects = await Projects.findAll();

    res.status(_constants.HTTP.CODE.OK).json({
        ok : true,
        message: _constants.PROJECT_CONTROLLER.PROJECT_HOME_MESSAGE,
        pageName: _constants.PROJECT_CONTROLLER.PAGE_NAME_HOME_MESSAGE,
        projects
    })
};

exports.projectsNewProjects = (req, res) => {
    res.status(_constants.HTTP.CODE.OK).json({
        ok : true,
        message: _constants.PROJECT_CONTROLLER.PROJECT_NEW_PROJECT_MESSAGE,
        pageName: _constants.PROJECT_CONTROLLER.PAGE_NEW_PROJECT_HOME_MESSAGE
    })
};

exports.projectByUrl = async (req, res) => {


    res.status(_constants.HTTP.CODE.OK).json({
        ok : true,
        message: _constants.PROJECT_CONTROLLER.PROJECT_NEW_PROJECT_MESSAGE,
    })
};

exports.newProject = async (req, res) => {
    const { name } = req.body;

    let errors = [];

    if (!name) {
        errors.push({
            message: _constants.PROJECT_CONTROLLER.NEW_PROJECT_ERROR_NO_NAME_MESSAGE
        })
    }

    if (errors.length > 0) {
        res.status(_constants.HTTP.CODE.BAD_REQUEST).json({
            errors
        })
    } else {
        // No errores insertar en la base de datos
        const project = await Projects.create({
            name
        });

        res.status(_constants.HTTP.CODE.OK).json({
            ok : true,
            message: _constants.PROJECT_CONTROLLER.NEW_PROJECT_MESSAGE,
        })
    }

};
