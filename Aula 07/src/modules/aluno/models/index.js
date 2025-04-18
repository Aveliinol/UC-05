const { pool } = require('../../../config/database');

class Aluno {
  static async criar(matricula, nome, email, senha) {
    const dados = [matricula, nome, email, senha]
    const consulta = `Insert into aluno (matricula, nome, email, senha) values ($1,$2,$3,$4) returning*`
    const novoAluno = await pool.query(consulta, dados)
    return novoAluno.rows
  }
  static async editar(matricula, nome, email, senha) {
    const dados = [matricula, nome, email, senha]
    const consulta = `update aluno set nome = $2, email = $3, senha = $4 where matricula = $1 returning*`
    const editAluno = await pool.query(consulta, dados)
    return editAluno.rows
  }
  static async listarPorMatricula(matricula) {
    const dados = [matricula]
    const consulta = `select * from aluno where matricula = $1`
    const aluno = await pool.query(consulta, dados)
    return aluno.rows
  }
  static async listar() {
    const consulta = `select *from aluno`
    const aluno = await pool.query(consulta)
    return aluno.rows
  }
  static async deletarPorMatricula(matricula) {
    const dados = [matricula]
    const consulta = `delete from aluno where matricula = $1 returning*`
    const deletAluno = await pool.query(consulta, dados)
  }
  static async deletarTodos() {
    const consulta = `delete from aluno returning*`
    const deleteAll = await pool.query(consulta)
  }
}

module.exports = Aluno