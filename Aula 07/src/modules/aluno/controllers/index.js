const AlunoModel = require('../models/index')

class AlunoController{
    static async criar(req, res){
         try {
            const {matricula, nome, email, senha} = req.body
            if(!matricula || !nome || !email || !senha){
                return res.status(400).json({msg:"Todos os campos devem ser preenchidos"})
            }
            const novoAluno = await AlunoModel.criar(matricula, nome, email, senha) 
            res.status(201).json({msg: "Aluno criado com sucesso", aluno: novoAluno})
         } catch (error) {
            res.status(500).json({msg:"Erro ao cadastrar aluno", erro: error.message})
         }
    }
    static async editar(req, res){
        try {
            
        } catch (error) {
           
        }
    }
    static async listar(req, res){ 
        try {
            const consulta = await AlunoModel.listar()
            if(consulta.length === 0){
              return res.status(400).json({msg: "Sem dados no Banco"})
            }
            res.status(200).json(consulta)
        } catch (error) {
            res.status(500).json({msg:"Erro ao listar alunos", erro: error.message})
        }
    }
    static async listarPorMatricula(req, res){
        try {
            const matricula = req.parems.id
            const aluno = await AlunoModel.listarPorMatricula(matricula)
            if(!aluno){
                return res.status(400).json({msg: "Aluno não encontrado"})
            }
            res.status(200).json(aluno)

        } catch (error) {
           res.status(500).json({msg:"Erro ao listar aluno", erro: error.message})
        }
    }
    static async deletarPorMatricula(req, res){
        try {
            
        } catch (error) {
           
        }
    }
    static async delatarAll(req, res){
        try {
            
        } catch (error) {
           
        }
    }
}