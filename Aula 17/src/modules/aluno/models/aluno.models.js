const sequelize = require('../../../config/configDb');
const { Datatypes } = require('sequelize');

const AlunoModel = sequelize.define('AlunoModel', {
    matricula: {
        type: Datatypes.STRING(9),
        primaryKey: true,
        validate: {
            isIn: {
                args: /^[a-zA-Z]\d{8}$/,
                msg: 'A matrícula deve começar com uma letra e ter quatro números em sequência'
            }
        }
    },
    nome: {
        type: Datatypes.STRING(100),
        allowNull: false,
        validate: {
            isAlpha: {
                msg: 'É permitido apenas letras!'
            }
        }
    },
    email: {
        type: Datatypes.STRING,
        unique: true,
        validate: {
            isEmail: {
                args: /^[a-zA-Z0-9._%+-]+@edum\.rn\.senac\.br$/,
                msg: 'E-mail inválido! O e-mail deve pertencer ao dominio @edum.rn.senac.br'
            }
        }
    },
    senha: {
        type: Datatypes.STRING(12),
        allowNull: false,
        validate: {
            len: {
                args: [8, 12],
                msg: 'A senha deve ter no minimo 8 e no maximo 12 caracteres'
            },
            is: {
                args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\[\]{}\-_+=|;:'",.<>?/]).{8,12}$/,
                msg: '🔒 Senha inválida. Use de 8 a 12 caracteres, com letras maiúsculas, minúsculas, número e símbolo.'
            }
        }
    },
    turma_cod: {
        type: Datatypes.CHAR(9),
        allowNull: false,
        references: {
            model: 'turma',
            key: 'turma_cod'
        }
    }
},
    {
        tableName: 'aluno',
        createdAt: 'criando_em',
        updatedAt: 'atualizado_em'
    },
);

module.exports = AlunoModel