const sequelize = require('../../../config/configDb');
const { DataTypes } = require('sequelize');


const TurmaModel = sequelize.define(
    'TurmaModel',
    {
      cod_turma: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        validate: {
            isNumeric:{
                msg: 'É permitido apenas números'
            },
            len:{
              args:[9],
              msg:'O código da turma deve ter 9 números'
          }
        }
      },
      fk_cod_curso:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric:{
              msg: 'É permitido apenas números'
          },
          len:{
            args:[4],
            msg:'O código do curso deve ter 4 números'
        }},
        references:{
            model: 'curso',
            key: 'cod_curso'
        }
      },

      turno: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate:{
          isIn:{
              args:[['matutino', 'vespertino', 'noturno']],
              msg: 'Turno invalido!'
          }
        }    
      }

    },
    {
      tableName: 'turma',
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em'
    },
  );

  module.exports = TurmaModel;