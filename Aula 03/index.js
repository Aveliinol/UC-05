// Importando com (ESM)
// import express from 'express';
// import dotenv from 'dotenv';

//Importando com (commonjs)
const express = require('express');
const dotenv = require('dotenv');
const {pool} = require('./src/config/database')

dotenv.config();

const port = process.env.PORTA;
const app = express();
//Aplicação usa express como json(javascript object notation)
app.use(express.json());


app.get('/produtos', async (requisicao, resposta) => {
  //Tratamento de  exceções
  try {
    const consulta = `select * from produto`
    const produtos = await pool.query(consulta)
    if(produtos.rows.length === 0){
      return resposta.status(200).json({msg:"Sem dados no momento"})
    }
    resposta.status(200).json(produtos.rows); 
  } catch (error) {
     resposta.status(500).json({msg:"Erro ao buscar banco de dados"})
  }

});

app.get('/produtos/:id', async (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const dados = [id]
    const consulta = `select * from produto where id = $1`
    const resultado = await pool.query(consulta, dados)
     if(resultado.rows.length === 0){
      return resposta.status(404).json({msg:"Produto não encontrado"})}
      resposta.status(200).json(resultado.rows);
  } catch (error) {
    resposta.status(500).json({msg:"Erro ao buscar banco de dados"})
  }
})

app.post('/produtos', async (requisicao, resposta) => {
  try {
    const {nome, preco, quantidade } = requisicao.body;
    if(!nome || !preco || !quantidade){
      return resposta.status(200).json({msg:"Todos os dados devem ser preenchidos"})
    }
    const novoProduto = [nome, preco, quantidade];
    const consulta = `Insert into produto(nome, preco, quantidade) values($1, $2, $3) returning*`
    await pool.query(consulta, novoProduto) 
    resposta.status(201).json({ mensagem: "Produto criado com sucesso" });
  } catch (error) {
    resposta.status(500).json({msg:"Erro ao registrar produto"})
  }
 
});

app.put('/produtos/:id', async (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const {novoNome, novoPreco, novaQuantidade} = requisicao.body;
    if(!id){
      return resposta.status(404).json({msg:'Informe o parametro!'})
    }
    const parametro = [id]
    const consulta = `select * from produto where id = $1`
    const resultado = await pool.query(consulta, parametro)
    if(resultado.rows.length === 0){
      return resposta.status(404).json({msg:"Produto não encontrado"})
    }
    const dados = [id, novoNome, novoPreco, novaQuantidade] 
    const update = `update produto set nome = $2, preco = $3, quantidade = $4  where id = $1 returning *`
    await pool.query(update, dados)
   resposta.status(200).json({msg:'Produto atualizado com sucesso'})
  } catch (error) {
    resposta.status(500).json({msg:"Erro ao atualizar produto", erro: error.message})
    
  }
})

app.delete('/produtos/:id', async (requisicao, resposta) => {
  try {
    const id = requisicao.params.id;
    const parametro = [id]
    const consulta = `select * from produto where id = $1`
    const resultado = await pool.query(consulta, parametro)
    if(resultado.rows.length === 0){
      return resposta.status(404).json({msg:"Produto não encontrado"})
    }
    const dados = [id]
    const deleta = `delete from produto where id = $1`
    await pool.query(deleta, dados)

    resposta.status(200).json({msg:"Produto deletado com sucesso"})
  } catch (error) {
    resposta.status(500).json({msg:"Erro ao deletar produto", erro: error.message})
  }
})

app.delete('/produtos', async (requisicao, resposta) => {
try {
  const consulta = `delete from produto`
  await pool.query(consulta)
} catch (error) {
  resposta.status(500).json({msg:"Erro ao deletar produto", erro: error.message})
}
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
