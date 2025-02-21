import mongoose from "mongoose";

// Função para conectar ao MongoDB
const conectarMongoDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/credit-api";
    await mongoose.connect(uri);
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1); // Encerra o processo em caso de erro
  }
};

export default conectarMongoDB;
