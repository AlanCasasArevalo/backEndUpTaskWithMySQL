const Projects = require('../models/Projects');
const Tasks = require('../models/Tasks');

exports.addNewTask = (req, res) => {
    res.status(_constants.HTTP.CODE.CREATION_OK)
        .json({
            ok : true,
            message: _constants.TASKS_CONTROLLER.NEW_TASK_SUCCESS_MESSAGE,
        })
};