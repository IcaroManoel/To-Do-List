import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import dotenv from 'dotenv';
dotenv.config();

const Usuario = sequelize.define("Usuario", {

nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },


})

export default Usuario;