const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const appUser = require('../models/appUser')
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/auth');

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '2 days' });
}

router.post("/register", async (req, res) => {
    try {
        // ** Get The User Data From Body ;
        const user = req.body;

        // ** destructure the information from user;
        const { username, password } = user;

        const isUsernameAllReadyExist = await appUser.findOne({
            username: username,
        });

        // ** Add a condition if the user exist we will send the response as email all ready exist
        if (isUsernameAllReadyExist) {
            res.status(400).json({
                status: 400,
                message: "Email all ready in use",
            });
            return;
        }

        // ** if not create a new user ;
        // !! Don't save the password as plain text in db . I am saving just for demonstration.
        // ** You can use bcrypt to hash the plain password.

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // now create the user;
        const newUser = await appUser.create({
            username: username,
            password: hashedPassword,
        });

        // Send the newUser as  response;
        res.status(200).json({
            status: 201,
            success: true,
            message: " User created Successfully",
            user: newUser,
        });
    } catch (error) {
        // console the error to debug
        console.log(error);

        // Send the error message to the client
        res.status(400).json({
            status: 400,
            message: error.message.toString(),
        });
    }
});

router.get("/verify", authenticateToken, async (req, res) => {
    res.status(200).json({ message: "ok" });
})

router.post("/login", async (req, res) => {
    try {
        // ** Get The User Data From Body ;
        const user = req.body;

        // ** destructure the information from user;
        const { username, password } = user;

        // ** Check the (email/user) exist  in database or not ;
        const isUserExist = await appUser.findOne({
            username: username,
        });

        // ** if there is not any user we will send user not found;
        if (!isUserExist) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "User not found",
            });
            return;
        }

        // ** if the (user) exist  in database we will check the password is valid or not ;
        // **  compare the password in db and the password sended in the request body        
        const isPasswordMatched = await bcrypt.compare(password, isUserExist?.password)


        // ** if not matched send response that wrong password;

        if (!isPasswordMatched) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "wrong password",
            });
            return;
        }

        // ** if the email and password is valid create a token

        /*
        To create a token JsonWebToken (JWT) receive's 3 parameter
        1. Payload -  This contains the claims or data you want to include in the token.
        2. Secret Key - A secure key known only to the server used for signing the token.
        3. expiration -  Additional settings like token expiration or algorithm selection.
        */

        // !! Don't Provide the secret openly, keep it in the .env file. I am Keeping Open just for demonstration

        // ** This is our JWT Token
        const token = generateAccessToken({ username: username })

        // send the response
        res.status(200).json({
            status: 200,
            success: true,
            message: "login success",
            token: token,
            username: isUserExist.username,
        });
    } catch (error) {
        // Send the error message to the client
        res.status(400).json({
            status: 400,
            message: error.message.toString(),
        });
    }
});

module.exports = router;