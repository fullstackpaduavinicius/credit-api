import { Router, RequestHandler } from "express";
import { criarSolicitacao, listarSolicitacoes, consultarStatus, atualizarStatusSolicitacao } from "../controllers/solicitacaoController";

const router = Router();

// Aplicando a tipagem RequestHandler corretamente
router.post("/", criarSolicitacao as RequestHandler);
router.get("/", listarSolicitacoes as RequestHandler);
router.get("/:id", consultarStatus as RequestHandler);

// 🔹 Nova rota para atualizar o status da solicitação
router.patch("/:id/status", atualizarStatusSolicitacao as RequestHandler);

export default router;
