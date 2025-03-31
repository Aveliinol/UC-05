const express = require('express');
const EnderecoController = require('../controllers/index');

const router = express.Router()

router.post('/endereco', EnderecoController.criarEndereco)

router.put('/endereco/:matricula', EnderecoController.editarEndereco)

router.get('/enderecos', EnderecoController.listarEnderecos)

router.get('/endereco/:matricula', EnderecoController.litstarEnderecoAluno)

router.get('/endereco/matricula/:matricula', EnderecoController.listarEndereco)

router.get('/endereco/localidade/:localidade', EnderecoController.listarEnderecoLocalidade)

router.get('/endereco/cep/:cep', EnderecoController.listarEnderecoCEP)

module.exports = router