const TurmaModel = require("../models/index")

class TurmaController{
    static async criarTurma(req, res){
        try {
            const {nome, modalidade, dataInicio, dataTermino} = req.body
            if(!nome || !modalidade || !dataInicio || !dataTermino){
                return res.status(404).json({msg:"Todos os campos devem ser preenchidos"})
            }
            const turma = await TurmaModel.criarTurma(nome, modalidade, dataInicio, dataTermino)
            res.status(201).json({msg:"Turma criada com sucesso", turmas: turma})
        } catch (error) {
            res.status(500).json({msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message})
        }
    }
    static async editarTurma(req, res){
        try {
            const id = req.params.id
            const {nome, modalidade, dataInico, dataTermino} = req.body
            if(!id){
                return res.status(404).json({msg:"Informe o ID"})
            }
            if(!nome || !modalidade || !dataInicio || !dataTermino){
                return res.status(404).json({msg:"Todos os campos devem ser preenchidos"})
            }
            const editTurma = await TurmaModel.editarTurma(id, nome, modalidade, dataInico, dataTermino)
            if(editTurma.length === 0){
                return res.status(404).json({msg:'Turma não encontrada'})
            }
            res.status(200).json({msg:"Turma editada com sucesso", turma: editTurma})
            
        } catch (error) {
            res.status(500).json({msg: "Erro interno do servidor. Por favor tente mais tarde!", erro: error.message})
        }
    }
    static async listarTurmas(){

    }
    static async listaTurmaPorID(){

    }
    static async deletarTurmas(){

    }
    static async deletarTurmaPorID(){

    }
}

module.exports = TurmaController