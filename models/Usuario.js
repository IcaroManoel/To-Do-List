import { Sequelize } from "sequelize";

const Usuario = Sequelize.define("Usuario", {

nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },


})

export default Usuario