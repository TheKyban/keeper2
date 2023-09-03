const User = require('../models/User.js');


exports.Reload = async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.json({
                success: false,
                message: 'Please Login Again'
            });
        }

        const user = await User.findById(token);

        if (!user) {
            return res.json({
                success: false,
                message: 'Please Login Again'
            });
        }

        res.cookie("token", user._id, {
            httpOnly: true,
            expires: 1000 * 60 * 60 * 24, // 24hrs
            maxAge: 1000 * 60 * 60 * 24, // 24hrs
        }).json({
            message: `You are Logged in`,
            success: true,
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });

    } catch (error) {
        console.log(error);
    }
};
