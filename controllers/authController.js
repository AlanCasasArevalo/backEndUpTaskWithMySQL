const passport = require('passport');
const _constants = require('../config/constants');

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
