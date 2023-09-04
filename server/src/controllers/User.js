const User = require("../models/User.js");
const bcrypt = require("bcrypt");

exports.Register = async (req, res) => {
    try {
        /**
         * Getting values from request body
         */

        const { firstName, lastName, email, password } = req.body;

        /**
         * check all parameter is given
         */

        if (!firstName || !lastName || !email || !password) {
            return res.json({
                message: "all parameter is required",
                success: false,
            });
        }

        /**
         * Check user already exist in db
         */

        const isUserExist = await User.findOne({ email: email });

        if (isUserExist) {
            return res.json({
                message: "user Already exist",
                success: false,
            });
        }

        /**
         * hash Password
         */

        const hashedPassword = await bcrypt.hash(password, 8);

        /**
         * Create user
         */

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        /**
         * send response
         */
        res.cookie("token", newUser._id, {
            httpOnly: true,
            expires: 1000 * 60 * 60 * 24, // 24hrs
            maxAge: 1000 * 60 * 60 * 24, // 24hrs
            sameSite: process.env.DEVELOPMENT === "true" ? "lax" : "none",
            secure: process.env.DEVELOPMENT === "true" ? false : true,
        }).json({
            message: "Successfully registered",
            success: true,
            user: {
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

exports.Login = async (req, res) => {
    try {
        /**
         * get email and password
         */

        const { email, password } = req.body;

        /**
         * check all parameter is given
         */

        if (!email || !password) {
            return res.json({
                message: "enter all fields",
                success: false,
            });
        }

        /**
         * Check user in database
         */

        const isUserExist = await User.findOne({ email });

        if (!isUserExist) {
            return res.json({
                message: "user not exist",
                success: false,
            });
        }

        /**
         * Check password is correct or not
         */

        const isMatch = await bcrypt.compare(password, isUserExist.password);

        if (!isMatch) {
            return res.json({
                message: "wrong password",
                success: false,
            });
        }

        /**
         * send response
         */
        console.log(process.env.PRODUCTION);
        res.cookie("token", isUserExist._id, {
            httpOnly: true,
            expires: 1000 * 60 * 60 * 24, // 24hrs
            maxAge: 1000 * 60 * 60 * 24, // 24hrs
            sameSite: process.env.DEVELOPMENT === "true" ? "lax" : "none",
            secure: process.env.DEVELOPMENT === "true" ? false : true,
        }).json({
            message: `Welcome back ${isUserExist.firstName}`,
            success: true,
            user: {
                _id: isUserExist._id,
                firstName: isUserExist.firstName,
                lastName: isUserExist.lastName,
                email: isUserExist.email,
            },
        });
    } catch (error) {
        console.log(error);
    }
};


exports.Logout = async (req, res) => {
    return res.cookie('token', '', {
        httpOnly: true,
        expires: 0, // 24hrs
        maxAge: 0,
        secure: process.env.PRODUCTION
    }).json({
        success: true,
        message: "user logged out"
    });
};