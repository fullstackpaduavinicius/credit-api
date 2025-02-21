import { Router, RequestHandler } from "express";
import { cadastrarCliente } from "../controllers/clienteController";

const router = Router();

// Rota para cadastrar um cliente
router.post("/", cadastrarCliente as RequestHandler);

export default router;
