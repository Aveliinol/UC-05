const {pool} = require('../../../config/database');

class Turma{
    static async criarTurma(nome, modalidade, dataInicio, dataTermino){
     const dados = [nome, modalidade, dataInicio, dataTermino]
     const consulta = `Insert into turma(nome, modalidade, dataInicio, dataTermino) values($1 $2 $3 $4) returning*`
     const novaTurma = await pool.query(consulta, dados)
     return novaTurma.rows
    }
    static async editarTurma(id, nome, modalidade, dataInicio, dataTermino){
     const dados = [id, nome, modalidade, dataInicio, dataTermino]
     const consulta = `update turma set nome = $2, modalidade = $3, dataInicio = $4, dataTermino = $5 where id = $1 returning*`
     const editTurma = await pool.query(consulta, dados)
     return editTurma.rows
    }
    static async listarTurmas(){
     const consulta = `select * from turma`
     const turma = await pool.query(consulta)
     return turma.rows
    }
    static async listaTurmaPorID(id){
     const dados = [id]
     const consulta = `select * from turma where id = $1`
     const turma = await pool.query(consulta, dados)
     return turma.rows
    }
    static async deletarTurmas(){
     const consulta = `delete from turma returning*`
     const turma = await pool.query(consulta)
     return turma.rows
    }
    static async deletarTurmaPorID(){
     const dados = [id]
     const consulta = `delete from turma where id = $1 returning*`
     const turma = await pool.query(consulta, dados)
     return turma.rows
    }
}

module.exports(Turma)