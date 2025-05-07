const sequelize = require('../../../config/configDb');
const { DataTypes } = require('sequelize');

const CursoModel = sequelize.define(
    'CursoModel',
    {
      cod_curso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        validate: {
            isNumeric:{
                msg: 'É permitido apenas números'
            },
            len:{
              args:[4],
              msg:'O código do curso deve ter 4 números'
          }
        }
      },

      nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

    },
    {
      tableName: 'turma',
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em'
    },
  );

  module.exports = CursoModel;