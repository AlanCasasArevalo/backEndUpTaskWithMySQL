const User = require('../models/Users');


exports.createNewUserAccount = async (req, res) => {

    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password;

    if (email && typeof email !== 'undefined' && password && typeof password !== 'undefined') {
        if (email.length > 6 || password.length > 5) {

            const user = await User.create({
                email,
                password
            });

            res.status(_constants.HTTP.CODE.CREATION_OK).json({
                ok : true,
                message: _constants.HTTP.MESSAGE.CREATION_OK,
                user
            })

        } else {
            res.status(_constants.HTTP.CODE.BAD_REQUEST).json({
                ok : false,
                message: _constants.USERS_CONTROLLER.NEW_USER_ERROR_NO_EMAIL_OR_PASSWORD_MESSAGE,
            })
        }

    }

    // res.status(_constants.HTTP.CODE.OK).json({
    //     ok : true,
    //     message: _constants.HTTP.MESSAGE.OK,
    // })

};