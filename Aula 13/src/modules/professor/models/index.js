const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configBd');

const Professor = sequelize.define(
   'Professor',
   {
      matricula:{
         type: DataTypes.CHAR(8),
         primaryKey: true,
         validate:{
            is:{
               args: /^[A-Za-z][0-9]{7}$/,
               msg:'A matricula deve começar com uma letra e mais 7 números!'
            }
         }
      },
      nome:{
         type: DataTypes.STRING(100),
         allowNull: false,
         validate:{
            len:{
               args:[2, 100]
            }
         }
      },
      email:{
         type: DataTypes.STRING(100),
         allowNull: false,
         unique: true,
         validate:{
            isEmail:{
               msg:'Forneça um e-mail valido'
            }
         }
      },
      senha:{
         type: DataTypes.CHAR(10),
         allowNull: false,
         validate:{
            args: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{10,}$/
         }
      }
   }
)

module.exports = Professor