const professorModel = require('../models/index')

class ProfessorController {
    static async criar() {
        try {
            const { matricula, nome, email, senha, areaAtuacao } = req.body
            if (!matricula || !nome || !email || !senha || !areaAtuacao) {
                return res.status(400).json({ msg: "Todos os campos devem ser preenchidos" })
            }
            const novoProf = await professorModel.criar(matricula, nome, email, senha, areaAtuacao)
            res.status(201).json({ msg: "Professor criado com sucesso", Prof: novoProf })
        } catch (error) {
            res.status(500).json({ msg: "Erro ao cadastrar Professor", erro: error.message })
        }

    }
    static async editar() {
        try {
            const matricula = req.params.matricula
            const { nome, email, senha, areaAtuacao } = req.body
            if (!matricula) {
                return res.status(400).json({ msg: "Informe a matricula" })
            }
            if (!nome || !email || !senha) {
                return res.status(400).json({ msg: "Todos os campos devem ser preenchidos" })
            }
            const editProfessor = await professorModel.editar(matricula, nome, email, senha, areaAtuacao)
            if (editProfessor.length === 0) {
                return res.status(400).json({ msg: "Professor não encontrado" })
            }
            res.status(200).json({ msg: "Professor editado com sucesso", prof: editProfessor })

        } catch (error) {
            res.status(500).json({ msg: "Erro ao editar Professor", erro: error.message })
        }
    }
    static async listarPorMatricula() {
        try {
            const matricula = req.params.matricula
            const professor = await professorModel.listarPorMatricula(matricula)
            if (professor.length === 0) {
                return res.status(400).json({ msg: "professor não encontrado" })
            }
            res.status(200).json(professor)

        } catch (error) {
            res.status(500).json({ msg: "Erro ao listar professor", erro: error.message })
        }
    }
    static async listarAll() {
        try {
            const consulta = await professorModel.listarAll()
            if (consulta.length === 0) {
                return res.status(400).json({ msg: "Sem dados no Banco" })
            }
            res.status(200).json(consulta)
        } catch (error) {
            res.status(500).json({ msg: "Erro ao listar professores", erro: error.message })
        }
    }
    static async deletarPorMatricula() {
        try {
            const matricula = req.params.matricula
            const professor = await professorModel.deletarPorMatricula(matricula)
            if (professor.length === 0) {
                return res.status(400).json({ msg: "Professor não encontrado" })
            }
            res.status(200).json({ msg: "Professor deletado com sucesso" })
        } catch (error) {
            res.status(500).json({ msg: "Erro ao deletar professor", erro: error.message })
        }
    }
    static async deletarAll() {
        try {
            await professorModel.deletarAll()
            res.status(200).json({ msg: "Professores excluídos com sucesso" })
        } catch (error) {
            res.status(500).json({ msg: "Erro ao deletar todos os professores", erro: error.message })
        }

    }
}

module.exports = ProfessorController