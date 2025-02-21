import express from "express";
import dotenv from "dotenv";
import clienteRoutes from "./routes/clienteRoutes";
import solicitacaoRoutes from "./routes/solicitacaoRoutes";
import conectarMongoDB from "./config/database";

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar o app
const app = express();
app.use(express.json()); // Permite o uso de JSON no corpo das requisições

// Conectar ao MongoDB
conectarMongoDB();

// Usar as rotas com um prefixo adequado
app.use("/api/clientes", clienteRoutes);
app.use("/api/solicitacoes", solicitacaoRoutes);

export default app;
