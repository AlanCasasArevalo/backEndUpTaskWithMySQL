const Projects = require('../models/Projects');
const Tasks = require('../models/Tasks');

exports.projectsHome = async (req, res) => {
    const projects = await Projects.findAll();

    if (projects && typeof projects !== 'undefined' && projects.length > 0) {
        res.status(_constants.HTTP.CODE.OK).json({
            ok : true,
            message: _constants.PROJECT_CONTROLLER.PAGE_HOME_SUCCESS_MESSAGE,
            pageName: _constants.PROJECT_CONTROLLER.PAGE_NAME_HOME_MESSAGE,
            projects
        });
    } else {
        res.status(_constants.HTTP.CODE.OK).json({
            ok : false,
            message: _constants.PROJECT_CONTROLLER.PAGE_HOME_FAIL_MESSAGE,
            pageName: _constants.PROJECT_CONTROLLER.PAGE_NAME_HOME_MESSAGE,
            projects
        });
    }

};

exports.projectsNewProjects = (req, res) => {
    res.status(_constants.HTTP.CODE.OK).json({
        ok : true,
        message: _constants.PROJECT_CONTROLLER.PROJECT_NEW_PROJECT_MESSAGE,
        pageName: _constants.PROJECT_CONTROLLER.PAGE_NEW_PROJECT_HOME_SUCCESS_MESSAGE
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

        const UserId = res.locals.user.id;

        // No errores insertar en la base de datos
        const project = await Projects.create({
            name,
            UserId
        });

        if (project && typeof project !== 'undefined') {
            res.status(_constants.HTTP.CODE.CREATION_OK).json({
                ok : true,
                message: _constants.PROJECT_CONTROLLER.NEW_PROJECT_SUCCESS_MESSAGE,
                project
            })
        } else {
            res.status(_constants.HTTP.CODE.INTERNAL_SERVER_ERROR).json({
                ok : false,
                message: _constants.PROJECT_CONTROLLER.NEW_PROJECT_FAIL_MESSAGE,
                project
            })
        }
    }

};

exports.projectByUrl = async (req, res) => {

    const project = await Projects.findOne({
        where: {
            url: req.params.url
        }
    });

    if (project && typeof project !== 'undefined') {
        const projectId = project.id;

        if (projectId && typeof projectId !== 'undefined'){
            const tasks = await Tasks.findAll({
                where: {
                    ProjectId: project.id
                }
            });

            res.status(_constants.HTTP.CODE.OK).json({
                ok : true,
                message: _constants.PROJECT_CONTROLLER.PROJECT_BY_URL_OR_ID_SUCCESS_MESSAGE,
                project,
                tasks
            })
        }

    } else {
        res.status(_constants.HTTP.CODE.INTERNAL_SERVER_ERROR).json({
            ok : false,
            message: _constants.PROJECT_CONTROLLER.PROJECT_BY_URL_OR_ID_FAIL_MESSAGE,
            project
        })
    }

};

exports.editForm = async (req, res) => {

    const project = await Projects.findOne({
        where: {
            id: req.params.id
        }
    });


    if (project && typeof project !== 'undefined') {
        res.status(_constants.HTTP.CODE.OK).json({
            ok : true,
            message: _constants.PROJECT_CONTROLLER.PROJECT_BY_URL_OR_ID_SUCCESS_MESSAGE,
            project
        })
    } else {
        res.status(_constants.HTTP.CODE.INTERNAL_SERVER_ERROR).json({
            ok : false,
            message: _constants.PROJECT_CONTROLLER.PROJECT_BY_URL_OR_ID_FAIL_MESSAGE,
            project
        })
    }
};

exports.updateProject = async (req, res) => {

    const projects = await Projects.findAll();
    const name = req.body.name;

    let errors = [];

    if (!name) {
        errors.push({
            message: _constants.PROJECT_CONTROLLER.NEW_PROJECT_ERROR_NO_NAME_MESSAGE
        });
    }

    if (errors.length > 0) {
        res.status(_constants.HTTP.CODE.NOT_FOUND).json({
            ok : false,
            message: _constants.HTTP.MESSAGE.NOT_FOUND,
            projects
        })
    } else {


        const project = await Projects.update(
            { name },
            { where: { id: req.params.id }}
        );

        const projectToUpdate = await Projects.findOne({
            where: {
                id: req.params.id
            }
        });

        if (project && typeof project !== 'undefined') {
            res.status(_constants.HTTP.CODE.ACCEPTED).json({
                ok : true,
                message: _constants.HTTP.MESSAGE.ACCEPTED,
                projectToUpdate
            })
        } else {
            res.status(_constants.HTTP.CODE.INTERNAL_SERVER_ERROR).json({
                ok : false,
                message: _constants.HTTP.MESSAGE.INTERNAL_SERVER_ERROR,
                projectToUpdate
            })
        }
    }
};

exports.deleteProject = async (req, res, next) => {

    const project = await Projects.findOne({
        where: {
            url: req.params.url
        }
    });

    const url = project.dataValues.url;

    if (url && typeof url !== 'undefined') {
        const result = await Projects.destroy({
            where: {
                url: url
            }
        });

        if (result && typeof result !== 'undefined') {
            res.status(_constants.HTTP.CODE.ACCEPTED).json({
                ok : false,
                message: _constants.PROJECT_CONTROLLER.DELETE_PROJECT_SUCCESS_MESSAGE,
                project
            })
        } else {
            return next()
        }
    } else {
        res.status(_constants.HTTP.CODE.INTERNAL_SERVER_ERROR).json({
            ok : false,
            message: _constants.PROJECT_CONTROLLER.DELETE_PROJECT_FAIL_MESSAGE,
            result
        })
    }

};