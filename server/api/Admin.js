// express
const express = require('express');
const router = express.Router();

// mongodb admin schema
const Admin = require('../schemas/AdminSchema');

// password handler
const bcrypt = require('bcrypt');

// signup
router.post('/signup', (req, res) => {
    let {email, password} = req.body;
    email = email?.trim();
    password = password?.trim();

    if(email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty input field!"
        });
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: "FAILED",
            message: "Invalid email entered!"
        })
    }else if(password.length < 8) {
        res.json({
            status: "FAILED",
            message: "Password is too short!"
        })
    }else {
        // Checking if user already exists
        Admin.find({email}).then(result => {
            if(result.length) {
                // A user already exists
                res.json({
                    status: "FAILED",
                    message: "User with the provided email already exists"
                })
            }else {
                // Try to create new user

                //password handling
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newAdmin = new Admin({
                        email,
                        password: hashedPassword
                    });

                    newAdmin.save().then(result => {
                        res.json({
                            status: "SUCCESS",
                            message: "Signup succesful",
                            data: result,
                        })
                    }).catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "An error occured while saving admin account!"
                        })
                    })
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while hashing password!"
                    })
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occured while checking for exisintg admin!"
            })
        })
    }
})


// sign in
router.post('/signin', (req, res) => {
    let {email, password} = req.body;
    email = email?.trim();
    password = password?.trim();

    if(email == "" || password == ""){
        res.json({
            status: "FAILED",
            message: "Empty credentials"
        })
    }else {
        // Check if user exist
        Admin.find({email})
        .then(data => {
            if(data.length) {
                // User exists
                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                    if(result) {
                        // Password match
                        res.json({
                            status: "SUCCESS",
                            message: "Signin successful",
                            data: data
                        })
                    }else {
                        res.json({
                            status: "FAILED",
                            message: "Invalid password entered"
                        })
                    }
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occured while comparing passwords"
                    })
                })
            }else {
                res.json({
                    status: "FAILED",
                    message: "Invalid credentials entered"
                })
            }
        })
        .catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occured while checking for existing user"
            })
        })
    }
})

module.exports = router;