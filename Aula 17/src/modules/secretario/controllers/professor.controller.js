const ProfessorModel = require('../../professor/models/professor.models');

class ProfessorController {
    static async criarProfessor(req, res) {
        try {
            const { matricula, nome, email, senha } = req.body;
            if (!matricula || !nome || !email || !senha) {
                return res.status(400).json({ msg: ' Todos os campos devem ser preenchidos' })
            }
            const professor = await ProfessorModel.create({matricula, nome, email, senha})
            res.status(201).json(professor)
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor. Por favor tente novamente mais tarde' })
        }
    }
    static async editarProfessor(req, res) {
        try {
            const matricula = req.params.matricula;
            const { nome, senha } = req.body;
            if (!nome || !senha) {
                return res.status(400).json({ msg: 'Todos os campos devem ser preenchidos' });
            }
            const professor = await ProfessorModel.update(
                { nome: nome, senha: senha, },
                { where: { matricula: matricula } }
            );
            if (professor.length === 0) {
                return res.status(404).json({ msg: 'Professor não encontrado!' });
            }
            res.status(200).json(professor);
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor. Por favor tente novamente mais tarde' });
        }
    }
    static async listarProfessores(req, res) {
        try {
            const professores = await ProfessorModel.findAll()
            if (professores.length === 0) {
                return res.status(200).json({ msg: 'Não há professores a serem exibidos!' })
            }
            res.status(200).json(professores)
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor. Por favor tente novamente mais tarde' })
        }
    }
    static async listarProfessorPorMatricula(req, res) {
        try {
            const matricula = req.params.matricula
            const professor = await ProfessorModel.findByPk(matricula)
            if (!professor) {
                return res.status(200).json({ msg: 'Professor não encontrado!' })
            }
            res.status(200).json(professor)
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor. Por favor tente novamente mais tarde' })
        }
    }
    static async deletarTodosProfessores(req, res) {
        try {
            await ProfessorModel.destroy({ where: {} });
            res.status(200).json({ msg: 'Professores excluidos com sucesso!' })
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor. Por favor tente novamente mais tarde' });
        }
    }
    static async deletarProfessorPorMatricula(req, res) {
        try {
            const matricula = req.params.matricula
            const professor = await ProfessorModel.findByPk( matricula );
            if (!professor) {
                return res.status(404).json({ msg: 'Professor não encontrado!' });
            }
            await ProfessorModel.destroy({
                where: {
                    matricula: matricula
                }
            })
            res.status(200).json({ msg: 'Professor excluido com sucesso!' })
        } catch (error) {
            res.status(500).json({ msg: 'Erro interno do servidor. Por favor tente novamente mais tarde' });
        }
    }
}

module.exports = ProfessorController