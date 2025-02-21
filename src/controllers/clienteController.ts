import { Request, Response } from "express";
import  Cliente  from "../models/cliente"; // Supondo que você tenha um modelo Cliente

export const cadastrarCliente = async (req: Request, res: Response) => {
  const { nome, email, rendaMensal, cpf } = req.body;

  try {
    const cliente = new Cliente({ nome, email, rendaMensal, cpf });
    await cliente.save();
    res.status(201).json(cliente);
  } catch (err) {
    res.status(500).json({ error: "Erro ao cadastrar o cliente" });
  }
};
