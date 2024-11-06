const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.userRegistration = async (req, res) => {
    console.log(req.body);

    const { email, username, password } = req.body

    if (!email || !username || !password) {
        res.status(400).json("Invalid data")
    }
    else {

        const newUser = new users({
            email, username, password, linkedin: "", github: "", profile: ""
        })
        await newUser.save()
        res.status(200).json(newUser)
    }
    // res.send('<h3>Request for user registration is hit</h3>')
}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const existing = await users.findOne({ email, password })

        if (existing) {
            const token = jwt.sign({ userId: existing._id }, process.env.SECRET_KEY)
            res.status(200).json({ token, username: existing.username,github:existing.github,linkedin:existing.linkedin,profile:existing.profile })
        }
        else {
            res.status(404).json('Invalid email/password')
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}

exports.userProfileUpdate = async (req, res) => {
    try {
        const userId = req.payload
        if (req.file) {
            var profile = req.file.filename
            var { username, github, linkedin } = req.body
        }
        else {
            var { username, github, linkedin, profile } = req.body
        }

        const exitingProfile = await users.findOne({ _id: userId })
        exitingProfile.username = username
        exitingProfile.github = github
        exitingProfile.linkedin = linkedin
        exitingProfile.profile = profile

        await exitingProfile.save()
        res.status(200).json("profile updated!!")
    }
    catch(err){
        console.log(err);
        res.status(400).json(err)
    }
    
}
