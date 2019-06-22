const Sequelize = require('sequelize');
const _constants = require('./constants');
const sequelize = new Sequelize(
    _constants.DATA_BASE_SETUP.DATA_BASE_NAME,
    _constants.DATA_BASE_SETUP.DATA_BASE_USERNAME,
    _constants.DATA_BASE_SETUP.DATA_BASE_PASSWORD, {
    host: _constants.DATA_BASE_SETUP.DATA_BASE_HOST,
    dialect: _constants.DATA_BASE_SETUP.DATA_BASE_DIALECT,
    port: _constants.DATA_BASE_SETUP.DATA_BASE_PORT,
    define: {
        timestamp: false
    }
});

module.exports = sequelize;