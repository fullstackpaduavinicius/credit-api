import { Request, Response } from "express";
import Solicitacao from "../models/solicitacao";
import Cliente from "../models/cliente";
import { sendEmail } from "../config/sendEmail"; // Importar a função de envio de e-mail

// Função para criar uma nova solicitação de crédito
export const criarSolicitacao = async (req: Request, res: Response) => {
  try {
    const { clienteId, valorSolicitado, prazoMeses } = req.body;

    // Verificar se o cliente existe
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado!" });
    }

    // Criar a solicitação
    const solicitacao = new Solicitacao({
      clienteId,
      valorSolicitado,
      prazoMeses,
      status: "pendente", // Status inicial
    });

    await solicitacao.save();

    res.status(201).json(solicitacao);
  } catch (error) {
    const err = error as Error; // Garantir que error é do tipo Error
    res.status(500).json({ message: "Erro ao criar solicitação", error: err.message });
  }
};

// Função para consultar o status da solicitação de crédito
export const consultarStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const solicitacao = await Solicitacao.findById(id);

    if (!solicitacao) {
      return res.status(404).json({ message: "Solicitação não encontrada!" });
    }

    res.status(200).json(solicitacao);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Erro ao consultar status", error: err.message });
  }
};

// Função para listar todas as solicitações de crédito
export const listarSolicitacoes = async (req: Request, res: Response) => {
  try {
    const solicitacoes = await Solicitacao.find();
    res.status(200).json(solicitacoes);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: "Erro ao listar solicitações", error: err.message });
  }
};

// Função para atualizar o status de uma solicitação
export const atualizarStatusSolicitacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Verificar se o status enviado é válido
    if (!["aprovado", "rejeitado"].includes(status)) {
      return res.status(400).json({ message: "Status inválido! Use 'aprovado' ou 'rejeitado'." });
    }

    const solicitacao = await Solicitacao.findById(id);
    if (!solicitacao) {
      return res.status(404).json({ message: "Solicitação não encontrada!" });
    }

    // Atualizar o status da solicitação
    solicitacao.status = status;
    await solicitacao.save();

    // Buscar informações do cliente
    const cliente = await Cliente.findById(solicitacao.clienteId);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado!" });
    }

    // Enviar e-mail de notificação
    const emailSubject = `Status da sua solicitação de crédito: ${status}`;
    const emailText = `Olá ${cliente.nome},\n\nSua solicitação de crédito foi ${status}.`;

    await sendEmail(cliente.email, emailSubject, emailText);

    res.status(200).json({ message: `Solicitação ${status} com sucesso!`, solicitacao });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar status da solicitação", error });
  }
};