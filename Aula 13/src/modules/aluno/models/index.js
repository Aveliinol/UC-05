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
      type: DataTypes.STRING(16),
      allowNull: false,
      validate:{
        len:{
          args:[8,16],
          msg: "A senha deve ter no minimo 8 caracteres e no máximo 16!"
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