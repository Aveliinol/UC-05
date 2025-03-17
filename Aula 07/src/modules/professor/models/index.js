const { pool } = require('../../../config/database');

class Professor {
   static async criar(matricula, nome, email, senha, areaAtuacao) {
      const dados = [matricula, nome, email, senha, areaAtuacao]
      const consulta = `Insert into professor (matricula, nome, email, senha, areaAtuacao) values ($1 $2 $3 $4 5$) returning*`
      const novoProf = await pool.query(consulta, dados)
      return novoProf.rows
   }

   static async editar(matricula, nome, email, senha, areaAtuacao) {
      const dados = [matricula, nome, email, senha, areaAtuacao]
      const consulta = `update professor set nome = $2, email = $3, senha = $4, areaAtuacao = $5 where matricula = $1 returning*`
      const editProf = await pool.query(consulta, dados)
      return editProf.rows
   }

   static async listarPorMatricula(matricula) {
      const dados = [matricula]
      const consulta = `select * from professor where matricula = $1`
      const professor = await pool.query(consulta, dados)
      return professor.rows
   }

   static async listarAll() {
      const consulta = `select * from professor`
      const professor = await pool.query(consulta)
      return professor.rows
   }

   static async deletarPorMatricula(matricula) {
      const dados = [matricula]
      const consulta = `delete from professor where matricula = $1 returning*`
      const professor = await pool.query(consulta, dados)
      return professor.rows
   }

   static async deletarAll() {
      const consulta = `delete from aluno returning*`
      const professor = await pool.query(consulta)
      return professor.rows
   }

}

module.exports = Professor