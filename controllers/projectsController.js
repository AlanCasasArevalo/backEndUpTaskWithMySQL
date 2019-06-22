exports.projectsHome = (req, res) => {

    res.status(_constants.HTTP.CODE.OK).json({
        ok : true,
        message: _constants.PROJECT_CONTROLLER.PROJECT_HOME_MESSAGE,
        pageName: _constants.PROJECT_CONTROLLER.PAGE_NAME_HOME_MESSAGE
    })
};

exports.projectsNewProjects = (req, res) => {
    res.status(_constants.HTTP.CODE.OK).json({
        ok : true,
        message: _constants.PROJECT_CONTROLLER.PROJECT_NEW_PROJECT_MESSAGE,
        pageName: _constants.PROJECT_CONTROLLER.PAGE_NEW_PROJECT_HOME_MESSAGE
    })
};
