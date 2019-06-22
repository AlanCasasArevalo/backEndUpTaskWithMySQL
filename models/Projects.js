const sequelize = require('sequelize');
const db = require('../config/db');
const slug = require("slug");
const shortId = require('shortid');

const Projects = db.define('Projects', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize.STRING,
    url: sequelize.STRING
}, {
    hooks: {
        beforeCreate(project, options) {
            const url = slug(project.name.toLowerCase());
            project.url = `${url}-${shortId.generate()}`
        }
    }
});

module.exports = Projects;