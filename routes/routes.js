const express = require('express')
const userController = require('../controller/userController')
const projectController = require('../controller/projectController')
const multerMiddle = require('../middleware/multerMiddleware')

const jwtmiddle = require('../middleware/jwtMiddleware')

const routes = express.Router()

routes.post('/reg',userController.userRegistration)
routes.post('/log',userController.userLogin)
routes.put('/profileupdate',jwtmiddle,multerMiddle.single('profile'),userController.userProfileUpdate)

routes.post('/addProject',jwtmiddle,multerMiddle.single('image'),projectController.addProjects)
routes.get('/pList',jwtmiddle,projectController.getProjectList)
routes.delete('/dltProject/:id',jwtmiddle,projectController.deleteProject)
routes.put('/editp/:id',jwtmiddle,multerMiddle.single('image'),projectController.editProject)
routes.get('/allp',projectController.allProjects)



module.exports = routes