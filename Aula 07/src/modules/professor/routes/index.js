const express = require('express')
const ProfessorController = require('../controllers/index')

const router = express.Router()

router.get('/professor', ProfessorController.listarAll)