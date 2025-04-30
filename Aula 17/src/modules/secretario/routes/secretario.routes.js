const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/aluno.controller')

// Listar Alunos - http://localhost:3000/secretario/listar-alunos
router.get('/secretario/listar-alunos', AlunoController.listarAlunos)

// Listar Aluno por Matricula - http://localhost:3000/secretario/listar-alunos/:matricula
router.get('/secretario/listar-aluno/:matricula', AlunoController.listarAlunoPorMatricula)

// Criar Aluno - http://localhost:3000/secretario/criar-aluno
router.post('/secretario/criar-aluno', AlunoController.criarAluno)

// Criar Editar - http://localhost:3000/secretario/editar-aluno
router.post('/secretario/editar-aluno', AlunoController.editarAluno)

// Deletar Aluno - http://localhost:3000/secretario/deletar-aluno/:matricula
router.post('/secretario/deletar-aluno/:matricula', AlunoController.deletarAlunoPorMatricula)

// Deletar Alunos - http://localhost:3000/secretario/deletar-aluno
router.post('/secretario/deletar-aluno', AlunoController.deletarTodosAlunos)

module.exports = router