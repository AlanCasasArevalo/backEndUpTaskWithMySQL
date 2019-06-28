const sequelize = require('sequelize');
const db = require('../config/db');
const _constants = require('../config/constants');
const projects = require('../models/Projects');

const Users = db.define(_constants.USER_MODEL.USERS_DEFINE_NAME, {
    id: {
        type: sequelize.INTEGER(_constants.USER_MODEL.ID_TYPE_MAXI_NUMBER),
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: sequelize.STRING(_constants.USER_MODEL.USER_NAME_MAX_CHARACTERS),
        allowNull: false
    },
    password: {
        type: sequelize.STRING(_constants.USER_MODEL.USER_PASSWORD_MAX_CHARACTERS),
        allowNull: false
    }
});

Users.hasMany(projects);

module.exports = Users;

