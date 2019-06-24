const Projects = require('../models/Projects');
const Tasks = require('../models/Tasks');

exports.addNewTask = async (req, res, next) => {
    const url = req.params.url;
    const name = req.body.name;
    const status = req.body.status;

    if (status && typeof status !== 'undefined') {
        this.status = req.body.status;
    } else {
        this.status = 1;
    }

    if (url && typeof url !== 'undefined'){
        if (name && typeof name !== 'undefined') {
            const project = await Projects.findOne({
                where: {
                    url
                }
            });

            if (project && typeof project !== 'undefined') {
                const ProjectId = project.id;
                const task = await Tasks.create({
                    name,
                    status,
                    ProjectId
                });

                if (task && typeof task !== 'undefined'){
                    res.status(_constants.HTTP.CODE.CREATION_OK)
                        .json({
                            ok : true,
                            message: _constants.TASKS_CONTROLLER.NEW_TASK_SUCCESS_MESSAGE,
                            task
                        })
                } else {
                    res.status(_constants.HTTP.CODE.INTERNAL_SERVER_ERROR)
                        .json({
                            ok : false,
                            message: _constants.HTTP.MESSAGE.INTERNAL_SERVER_ERROR,
                        })
                }
            } else {
                res.status(_constants.HTTP.CODE.NOT_FOUND)
                    .json({
                        ok : false,
                        message: _constants.HTTP.MESSAGE.NOT_FOUND,
                    })
            }
        }  else {
            res.status(_constants.HTTP.CODE.BAD_REQUEST)
                .json({
                    ok : false,
                    message: _constants.TASKS_CONTROLLER.NEW_TASK_NAME_IS_NECESSARY_MESSAGE,
                })
        }
    } else {
        res.status(_constants.HTTP.CODE.BAD_REQUEST)
            .json({
                ok : false,
                message: _constants.HTTP.MESSAGE.BAD_REQUEST,
            })
    }
};

exports.updateTask = async (req, res) => {

    const taskId = req.params.id;
    if (taskId && typeof taskId !== 'undefined') {
        const task = await Tasks.findOne({
            where: {
                id: taskId
            }
        });

        if (task && typeof task !== 'undefined') {
            const name = req.body.name;
            const status = req.body.status;

            if (name === task.dataValues.name && status === task.dataValues.status){
                res.status(_constants.HTTP.CODE.BAD_REQUEST).json({
                    ok : false,
                    message: _constants.TASKS_CONTROLLER.UPDATE_TASK_NOT_CHANGE_MESSAGE,
                })
            } else {
                task.status = req.body.status;
                task.name = req.body.name;
                const taskUpdated = await task.save();

                if (taskUpdated && typeof taskUpdated !== 'undefined') {
                    res.status(_constants.HTTP.CODE.ACCEPTED).json({
                        ok : false,
                        message: _constants.HTTP.MESSAGE.ACCEPTED,
                        taskUpdated
                    })
                } else {
                    res.status(_constants.HTTP.CODE.INTERNAL_SERVER_ERROR).json({
                        ok : false,
                        message: _constants.HTTP.CODE.INTERNAL_SERVER_ERROR,
                    })
                }

            }

        } else {
            res.status(_constants.HTTP.CODE.NOT_FOUND)
                .json({
                    ok : false,
                    message: _constants.HTTP.MESSAGE.NOT_FOUND,
                })
        }
    } else {
        res.status(_constants.HTTP.CODE.BAD_REQUEST)
            .json({
                ok : false,
                message: _constants.HTTP.MESSAGE.BAD_REQUEST,
            })
    }


};
