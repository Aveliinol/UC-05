const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configBd');

const Aluno = sequelize.define(
  'Aluno',
  {
    matricula: {
      type: DataTypes.CHAR(7),
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate:{
        isEmail:{
          msg: "Fornaça um e-mail valido!"
        }
      }
    },
    senha: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate:{
        len:{
          args:[10],
          msg: "A senha deve ter 10 caracteres!"
        }
      }
    }
  },
  {
    tableName:'aluno',
    createdAt:'criado_em',
    updatedAt:'atualizado_em'
  },
);