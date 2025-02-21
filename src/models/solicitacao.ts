import mongoose, { Document, Schema } from "mongoose";

// Interface que define a estrutura da Solicitação de Crédito
interface ISolicitacao extends Document {
  clienteId: mongoose.Types.ObjectId;
  valorSolicitado: number;
  prazoMeses: number;
  status: "pendente" | "aprovado" | "rejeitado"; // Status da solicitação
}

// Definição do Schema da Solicitação de Crédito
const solicitacaoSchema: Schema<ISolicitacao> = new Schema(
  {
    clienteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
    },
    valorSolicitado: {
      type: Number,
      required: true,
    },
    prazoMeses: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pendente", "aprovado", "rejeitado"],
      default: "pendente", // Inicialmente a solicitação está pendente
    },
  },
  {
    timestamps: true, // Adiciona os campos createdAt e updatedAt
  }
);

// Criar e exportar o modelo Solicitação de Crédito
const Solicitacao = mongoose.model<ISolicitacao>("Solicitacao", solicitacaoSchema);

export default Solicitacao;
