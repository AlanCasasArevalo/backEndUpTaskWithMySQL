const sequelize = require('sequelize');
const db = require('../config/db');
const slug = require("slug");
const shortId = require('shortid');
const _constants = require('../config/constants');

const Projects = db.define('Projects', {
    id: {
        type: sequelize.INTEGER(_constants.PROJECT_MODEL.ID_TYPE_MAXI_NUMBER),
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize.STRING(_constants.PROJECT_MODEL.PROJECT_NAME_MAX_CHARACTERS),
    url: sequelize.STRING(_constants.PROJECT_MODEL.PROJECT_URL_MAX_CHARACTERS)
}, {
    hooks: {
        beforeCreate(project, options) {
            const url = slug(project.name.toLowerCase());
            project.url = `${url}-${shortId.generate()}`
        }
    }
});

module.exports = Projects;