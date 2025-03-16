const professorModel = require('../models/index')

class ProfessorController {
    static async criar() {
        try {
            const { matricula, nome, email, senha} = req.body
            if (!matricula || !nome || !email || !senha) {
                return res.status(400).json({ msg: "Todos os campos devem ser preenchidos" })
            }
            const novoProf = await professorModel.criar(matricula, nome, email, senha, turma)
            res.status(201).json({ msg: "Professor criado com sucesso", Prof: novoProf })
        } catch (error) {
            res.status(500).json({ msg: "Erro ao cadastrar Professor", erro: error.message })
        }

    }
    static async editar() {
        try {
            const matricula = req.params.id
            const { nome, email, senha} = req.body
            if (!matricula) {
                return res.status(400).json({ msg: "Informe a matricula" })
            }
            const editProfessor = await professorModel.editar(matricula, nome, email, senha)
            if (!editProfessor) {
                return res.status(400).json({ msg: "Professor não encontrado" })
            }
            res.status(200).json({ msg: "Professor editado com sucesso", prof: editProfessor })

        } catch (error) {
            res.status(500).json({ msg: "Erro ao editar Professor", erro: error.message })
        }
    }
    static async listarPorMatricula() {
        try {
            const matricula = req.params.id
            const professor = await professorModel.listarPorMatricula(matricula)
            if (!professor) {
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
            const matricula = req.params.id
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
            const professor = await professorModel.deletarAll()
            res.status(200).json({ msg: "Professores excluídos com sucesso" })
        } catch (error) {
            res.status(500).json({ msg: "Erro ao deletar professores", erro: error.message })
        }

    }
}

module.exports(ProfessorController)