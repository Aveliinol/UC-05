const express = require('express');
const AlunoController = require('../controllers/index');

const router = express.Router()

router.get('/alunos', AlunoController.listar)

router. get('/aluno/:matricula', AlunoController.listarPorMatricula)

router.post('/alunos', AlunoController.criar)

router.put('/alunos/:matricula', AlunoController.editar)

router.delete('/alunos', AlunoController.delatarAll)

router.delete('/aluno/:matricula', AlunoController.deletarPorMatricula)

module.exports = router