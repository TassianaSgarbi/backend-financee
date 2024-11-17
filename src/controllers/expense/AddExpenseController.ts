import { Request, Response } from "express";
import { AddExpenseService } from "../../services/expense/AddExpenseService";

// Estendendo a interface Request para incluir a propriedade user_id
interface RequestWithUser extends Request {
  user_id?: string; // user_id pode ser string ou undefined
}

class AddExpenseController {
  async handle(req: RequestWithUser, res: Response) {
    const { description, amount, due_date, category_id, observation } = req.body;

    // Garantir que user_id está presente
    const user_id = req.user_id;

    if (!user_id) {
      return res.status(400).json({ error: "User not authenticated" });
    }

    const addExpenseService = new AddExpenseService();

    // Passando o user_id com certeza de que é uma string
    const expense = await addExpenseService.execute({
      description,
      amount,
      due_date,
      category_id,
      user_id,
      observation,
    });

    return res.json(expense);
  }
}

export { AddExpenseController };
