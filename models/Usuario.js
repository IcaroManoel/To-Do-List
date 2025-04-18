import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // cria os campos createdAt e updatedAt automaticamente
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
