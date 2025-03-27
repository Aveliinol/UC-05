const {pool} = require('../../../config/database');
const axios = require('axios')

class EnderecoModel{
    static async criarEnderecoAluno(matricula, cep, numero, ponto_referencia){
        const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const logradouro = res.data.logradouro
        const complemento = res.data.complemento
        const bairro = res.data.bairro
        const localidade = res.data.localidade
        const uf = res.data.uf
        // Desestruturação do objeto
        // const {logradouro, complemento, baiiro, localidade, uf} = res.data

        // Montado o array para query
        const dados = [
            matricula,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            localidade,
            uf,
            ponto_referencia    
        ]

        const consulta = `Insert into endereco(matricula, cep, logradouro, numero, complemento, bairro, localidade, uf, ponto_referencia)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`

        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async editarEnderecoAluno(matricula, cep, numero, ponto_referencia){
        const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const logradouro = res.data.logradouro
        const complemento = res.data.complemento
        const bairro = res.data.bairro
        const localidade = res.data.localidade
        const uf = res.data.uf
        
        const dados = [
            matricula,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            localidade,
            uf,
            ponto_referencia    
        ]

        const consulta = `update endereco set cep = $2, logradouro = $3, numero = $4, complemento = $5,
         bairro = $6, localidade $7, uf = $8, ponto_referencia = $9 where matricula = $1 returning *`
        
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async listarEnderecos(){
        const consulta = `select * from endereco`
        const resultado = await pool.query(consulta)
        return resultado.rows
    }
    static async litstarEnderecoAluno(matricula){
        const dados = [matricula]
        const consulta = `select * from endereco where matricula = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async listarEnderecoCEP(cep){
        const dados = [cep]
        const consulta = `select * from endereco where cep = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async listarEnderecoLocalidade(localidade){
        const dados = [localidade]
        const consulta = `select * from endereco where localidade = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }
    static async listarEndereco(matricula){
        const dados = [matricula]
        const consulta = `select aluno.*, endereco.* from aluno 
        join endereco on aluno.matricula = endereco.matricula
        where aluno.matricula = $1`
    }
}

module.exports(EnderecoModel)