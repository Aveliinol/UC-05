const EnderecoModel = require("../models/index")

class EnderecoController{
    static async criarEndereco(req, res){
        try {
            const {matricula, cep, numero, ponto_referencia} = req.body
            if(!matricula || !cep || !numero ){
                return res.status(400).json({msg:"Todos os campos devem ser preenchidos"})
            }
            const endereco = await EnderecoModel.criarEnderecoAluno(matricula, cep, numero, ponto_referencia)
            res.status(201).json({msg:"endereço criado com sucesso", end: endereco})
        } catch (error) {
            res.status(500).json({msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message})
        }
    }
    static async editarEndereco(req, res){
        try {
            const matricula = req.params.matricula
            const {cep, numero, ponto_referencia} = req.body 
            if (!cep || !numero ){
                return res.status(400).json({msg:"Todos os campos devem ser preenchidos"})
            }
            const endereco = await EnderecoModel.editarEnderecoAluno(matricula, cep, numero, ponto_referencia)
            if(endereco.length === 0){
                return res.status(400).json({ msg: "Endereço não encontrado" })
            }
            res.status(200).json({ msg: "Endereço editado com sucesso", End: endereco })
        } catch (error) {
            res.status(500).json({msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message})
        }
    }
    static async listarEnderecos(req, res){
        try {
            const endereco = await EnderecoModel.listarEnderecos()
            if (endereco.length === 0) {
                return res.status(400).json({ msg: "Sem dados no Banco" })
            }
            res.status(200).json(endereco)
        } catch (error) {
            res.status(500).json({msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message})
        }
    }
    static async litstarEnderecoAluno(req, res){
        try {
            const matricula = req.params.matricula
            const endereco = await EnderecoModel.litstarEnderecoAluno(matricula)
            if (endereco.length === 0) {
                return res.status(404).json({ msg: "Endereço não encontrado" })
            }
            res.status(200).json(endereco)
        } catch (error) {
            res.status(500).json({msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message})
        }
    }
    static async listarEnderecoCEP(req, res){
        try {
            const cep = req.params.cep
            const endereco = await EnderecoModel.listarEnderecoCEP(cep)
            if (endereco.length === 0) {
                return res.status(404).json({ msg: "Endereço não encontrado" })
            }
            res.status(200).json(endereco)
        } catch (error) {
            res.status(500).json({msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message})
        }
    }
    static async listarEnderecoLocalidade(req, res){
        try {
            const localidade = req.params.localidade
            const endereco = await EnderecoModel.listarEnderecoLocalidade(localidade)
            if (endereco.length === 0) {
                return res.status(404).json({ msg: "Endereço não encontrado" })
            }
            res.status(200).json(endereco)
        } catch (error) {
            res.status(500).json({msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message}) 
        }
    }
    static async listarEndereco(req, res){
        try {
            const matricula = req.params.matricula
            const endereco = await EnderecoModel.listarEndereco(matricula)
            if (endereco.length === 0) {
                return res.status(404).json({ msg: "Endereço não encontrado" })
            }
        } catch (error) {
        res.status(500).json({msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message}) 
        }
    }
}

module.exports = EnderecoController