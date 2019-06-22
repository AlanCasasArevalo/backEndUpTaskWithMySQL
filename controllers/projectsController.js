exports.projectsHome = (req, res) => {
    res.status(200).json({
        ok : true,
        message: 'Home OK'
    })
};

exports.projectUs = (req, res) => {
    res.status(200).json({
        ok : true,
        message: 'Sobre nosotros OK'
    })
};
