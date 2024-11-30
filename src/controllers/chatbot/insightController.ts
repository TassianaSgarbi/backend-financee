import { Request, Response } from 'express';
import * as insightService from '../../services/chatbot/insightService'

// Estendendo a interface Request para incluir a propriedade user_id
interface RequestWithUser extends Request {
    user_id?: string; // user_id pode ser string ou undefined
  }

export async function gerarInsight(req: RequestWithUser, res: Response) {
  const { pergunta } = req.body;

  const userId = req.user_id as string

  if (!pergunta) {
    return res.status(400).json({ error: 'A pergunta é obrigatória.' });
  }

  try {
    const resposta = await insightService.gerarInsight(pergunta, userId);
    res.json({ resposta });
  } catch (error) {
    console.error('Erro ao gerar insight:', error);
    res.status(500).json({ error: 'Erro ao gerar insight.' });
  }
}