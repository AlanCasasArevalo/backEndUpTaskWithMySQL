const sequelize = require('sequelize');
const db = require('../config/db');
const _constants = require('../config/constants');

const Tasks = db.define(_constants.TASKS_MODEL.TASKS_DEFINE_NAME, {
    id: {
        type: sequelize.INTEGER(_constants.TASKS_MODEL.ID_TYPE_MAXI_NUMBER),
        primaryKey: true,
        autoIncrement: true
    },
    task: sequelize.STRING(_constants.TASKS_MODEL.TASK_MAX_NAME_STRING),
    state: sequelize.INTEGER(_constants.TASKS_MODEL.TASK_STATE_MAX)
});

module.exports = Tasks;

