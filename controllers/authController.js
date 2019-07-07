const passport = require('passport');
const _constants = require('../config/constants');
const Users = require('../models/Users');
const crypto = require('crypto');

exports.userAuthentication = async (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err && typeof err !== 'undefined') {
            return next(err)
        }
        if (!user && typeof user === 'undefined') {
            return res.redirect('/login')
        }

        req.logIn(user, (error) => {
            if (error && typeof error !== 'undefined') {
                return next(error)
            } else if (user && typeof user !== 'undefined'){
                res.status(_constants.HTTP.CODE.OK).json({
                    ok : true,
                    message: _constants.HTTP.MESSAGE.OK,
                    user
                });
            }

        })

    })(req, res, next);
};


exports.authenticatedUser = async (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.status(_constants.HTTP.CODE.FORBIDDEN).json({
            ok: false,
            message: _constants.HTTP.MESSAGE.FORBIDDEN,
        })
    }
};

exports.closeSession = async (req, res) => {
    req.session.destroy( () => {
        res.status(_constants.HTTP.CODE.OK).json({
            ok: true,
            message: _constants.HTTP.MESSAGE.OK,
        });
    });
};

exports.toSendToken = async (req, res, next) => {
    const email = req.body.email;

    const user = await Users.findOne({
        where: {
            email
        }
    });

    if (user && typeof user !== 'undefined') {
        const token = crypto.randomBytes(20).toString('hex');
        const expiration = Date.now() + 360000;

        user.token = token;
        user.expiration = expiration;

        const userSaved = await user.save();

        if (userSaved && typeof userSaved !== 'undefined') {
            // url de reset
            const resetUrl = `http://${req.headers.host}/reset-account/${token}`;

            if (resetUrl && typeof resetUrl !== 'undefined') {
                res.status(_constants.HTTP.CODE.OK).json({
                    ok: true,
                    message: _constants.HTTP.MESSAGE.OK,
                    resetUrl
                });
            } else {
                res.status(_constants.HTTP.CODE.INTERNAL_SERVER_ERROR).json({
                    ok: false,
                    message: _constants.HTTP.MESSAGE.INTERNAL_SERVER_ERROR,
                });
            }
        }
    } else {
        res.status(_constants.HTTP.CODE.BAD_REQUEST).json({
            ok: false,
            message: _constants.HTTP.MESSAGE.BAD_REQUEST,
        });
    }
};

exports.resetPassword = async (req, res, next) => {
    let token = req.params.token;

    if (token && typeof token !== 'undefined'){
        const user = await Users.findOne({
            where: {
                token
            }
        });

        if (user && typeof user !== 'undefined') {
            res.render('resetPassword', {
                pageName: 'Restablecer contraseña'
            });
        } else {
            res.status(_constants.HTTP.CODE.BAD_REQUEST).json({
                ok: false,
                message: _constants.HTTP.MESSAGE.BAD_REQUEST,
            });
        }
    }
};
