import mongoose, { Document, Schema } from "mongoose";

// Interface que define a estrutura do Cliente
interface ICliente extends Document {
  nome: string;
  email: string;
  rendaMensal: number;
  cpf: string;
}

// Definição do Schema do Cliente
const clienteSchema: Schema<ICliente> = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Garantir que o email seja único
    },
    rendaMensal: {
      type: Number,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
      unique: true, // Garantir que o CPF seja único
    },
  },
  {
    timestamps: true, // Adiciona os campos createdAt e updatedAt
  }
);

// Criar e exportar o modelo Cliente
const Cliente = mongoose.model<ICliente>("Cliente", clienteSchema);

export default Cliente;
