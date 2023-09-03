const User = require('../models/User.js');

exports.isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.json({
                success: false,
                message: 'Please Login first'
            });
        }

        const user = await User.findById(token);

        if (!user) {
            return res.json({
                success: false,
                message: 'invalid token'
            });
        }

        req.user = user._id;
        next();

    } catch (error) {
        console.log(error);
    }
};
