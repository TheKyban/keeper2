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
                message: 'all parameter is required'
            });
        }

        /**
         * Check user already exist in db
         */

        const isUserExist = await User.findOne({ email: email });

        if (isUserExist) {
            return res.json({
                message: "user Already exist",
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


        res.json({
            message: 'Successfully registered'
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
                message: 'enter all fields'
            });
        }

        /**
         * Check user in database
         */

        const isUserExist = await User.findOne({ email });

        if (!isUserExist) {
            return res.json({
                message: 'user not exist'
            });
        }


        /**
         * Check password is correct or not
         */

        const isMatch = await bcrypt.compare(password, isUserExist.password);

        if (!isMatch) {
            return res.json({
                message: 'wrong password'
            });
        }

        /**
         * send response
         */
        res.cookie('token', isUserExist._id, {
            httpOnly: true,
            expire: 1000 * 60 * 60 * 24 // 24hrs
        }).json({
            _id: isUserExist._id,
            firstName: isUserExist.firstName,
            lastName: isUserExist.lastName,
            email: isUserExist.email,
        });
    } catch (error) {
        console.log(error);
    }
};
