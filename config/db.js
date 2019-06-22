const Sequelize = require('sequelize');

const sequelize = new Sequelize(_constants.DATA_BASE_SETUP.DATA_BASE_NAME, _constants.DATA_BASE_SETUP.DATA_BASE_USERNAME, _constants.DATA_BASE_SETUP.DATA_BASE_PASSWORD, {
    host: _constants.DATA_BASE_SETUP.DATA_BASE_HOST,
    dialect: _constants.DATA_BASE_SETUP.DATA_BASE_DIALECT,
    port: _constants.DATA_BASE_SETUP.DATA_BASE_PORT,
    operatorsAliases: _constants.DATA_BASE_SETUP.DATA_BASE_OPERATORS_ALIASES,
    define: {
        timestamp: _constants.DATA_BASE_SETUP.DATA_BASE_TIME_STAMP
    }
});