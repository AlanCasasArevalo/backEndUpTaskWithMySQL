exports.createNewUserAccount = async (req, res) => {
    res.status(_constants.HTTP.CODE.OK).json({
        ok : true,
        message: _constants.HTTP.MESSAGE.OK,
    })
};