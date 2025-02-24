// Importando com (ESM)
// import express from 'express';
// import dotenv from 'dotenv';

//Importando com (commonjs)
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORTA;
const app = express();
//Aplicação usa express como json(javascript object notation)
app.use(express.json());

const bancoDados = [];

app.get('/produtos', (requisicao, resposta) => {
  //Tratamento de  exceções
  try {
    if(bancoDados.length === 0){
      return resposta.status(200).json({msg:"Sem dados no momento"})
    }
    resposta.status(200).json(bancoDados); 
  } catch (error) {
     resposta.status(500).json({msg:"Erro ao buscar banco de dados"})
  }

});

app.get('/produtos/:id', (requisicao, resposta) => {
  try {
    const produto = bancoDados.find(i => i.id ===
      requisicao.params.id);
    if(!produto){
      return resposta.status(404).json({msg:"Produto não encontrado"})}
      resposta.status(200).json(produto);
  } catch (error) {
    resposta.status(500).json({msg:"Erro ao buscar banco de dados"})
  }
})

app.post('/produtos', (requisicao, resposta) => {
  try {
    const { id, nome, preco } = requisicao.body;
    if(!id || !nome || !preco){
      return resposta.status(200).json({msg:"Todos os dados devem ser preenchidos"})
    }
    const novoProduto = { id, nome, preco };
    bancoDados.push(novoProduto);
    resposta.status(201).json({ mensagem: "Produto criado com sucesso" });
  } catch (error) {
    resposta.status(500).json({msg:"Erro ao registrar produto"})
  }
 
});

app.put('/produtos/:id', (requisicao, resposta) => {
  try {
    const id = requisicao.params.id
    const {novoNome, novoPreco} = requisicao.body;
    if(!id){
      return resposta.status(404).json({msg:"Informe um parametro"})
    }
    const produto = bancoDados.find(i => i.id ===
      id)
    if(!produto){
      return resposta.status(404).json({msg:"Produto não encontrado"})
    }
    if(produto){
      produto.nome = novoNome,
      produto.preco = novoPreco;
    }
   resposta.status(200).json({msg:'Produto atualizado com sucesso'})
  } catch (error) {
    resposta.status(500).json({msg:"Erro ao atualizar produto"})
  }
})

app.delete('/produtos/:id', (requisicao, resposta) => {
  try {
    const produto = bancoDados.findIndex(i => i.id ===
      requisicao.params.id);
    if(produto === -1){
      return resposta.status(404).json({msg:"Produto não encontrado"})
    }
    bancoDados.splice(produto, 1)
    resposta.status(200).json({msg:"Produto deletado com sucesso"})
  } catch (error) {
    resposta.status(500).json({msg:"Erro ao deletar produto"})
  }
})

app.delete('/produtos', (requisicao, resposta) => {
try {
  bancoDados.length = 0;
} catch (error) {
  resposta.status(500).json({msg:"Erro ao deletar produto"})
}
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
