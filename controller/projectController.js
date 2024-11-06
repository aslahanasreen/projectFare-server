const { json } = require('express')
const projects = require('../models/projectModel')

exports.addProjects = async (req, res) => {
    try {
        const { title, description, languages, github, demo } = req.body
        const image = req.file.filename
        const userId = req.payload

        if (!title || !description || !languages || !image || !github || !demo) {
            res.status(406), json("Enter valid data!!")
        }
        else {
            const newProject = new projects({
                title, description, languages, image, github, demo, userId
            })

            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}

exports.getProjectList = async (req, res) => {
    try {
        const userId = req.payload
        const projectList = await projects.find({ userId })
        res.status(200).json(projectList)
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }

}

exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params
        const result = await projects.findOneAndDelete({ _id: id })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}

exports.editProject = async (req, res) => {
    try {
        const { id } = req.params

        if (req.file) {
            var image = req.file.filename
            var { title, description, languages, github, demo } = req.body
        }
        else {
            var { title, description, languages, github, demo, image } = req.body
        }

        const userId = req.payload

        if (!title || !description || !languages || !github || !demo || !image) {
            res.status(406).json('Enter valid data!!')
        }
        else {
            const existing = await projects.findOne({ _id: id })

            existing.title = title
            existing.description = description
            existing.languages = languages
            existing.github = github
            existing.demo = demo
            existing.image = image

            await existing.save()
            res.status(200).json(existing)
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}

exports.allProjects = async (req, res) => {
    try {
        const allprojects = await projects.find()
        res.status(200).json(allprojects)
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}