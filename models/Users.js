const sequelize = require('sequelize');
const db = require('../config/db');
const _constants = require('../config/constants');
const projects = require('../models/Projects');
const bcrypt = require('bcrypt-nodejs');

const Users = db.define(_constants.USER_MODEL.USERS_DEFINE_NAME, {
    id: {
        type: sequelize.INTEGER(_constants.USER_MODEL.ID_TYPE_MAXI_NUMBER),
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: sequelize.STRING(_constants.USER_MODEL.USER_EMAIL_MAX_CHARACTERS),
        allowNull: false,
        validate: {
            isEmail: {
                msg: _constants.USER_MODEL.USER_EMAIL_FAIL_NO_VALID_EMAIL
            },
            notEmpty: {
                msg: _constants.USER_MODEL.USER_EMAIL_FAIL_NO_EMPTY_EMAIL
            }
        },
        unique: {
            args: true,
            msg: _constants.USER_MODEL.USER_FAIL_USER_ALREADY_REGISTER
        }
    },
    password: {
        type: sequelize.STRING(_constants.USER_MODEL.USER_PASSWORD_MAX_CHARACTERS),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: _constants.USER_MODEL.USER_FAIL_NO_EMPTY_PASSWORD
            }
        }
    }
    ,
    token: sequelize.STRING,
    expiration: sequelize.DATE
}, {
    hooks: {
        beforeCreate(user, options) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(_constants.USER_MODEL.USER_BCRYPT_SALT))
        }
    }
});

Users.prototype.passwordVerification = function (password) {
    // Este metod te permite comparar los passwords para ver si son iguales y permitir o no al usuario entrear.
    return bcrypt.compareSync(password, this.password);
};

Users.hasMany(projects);

module.exports = Users;

