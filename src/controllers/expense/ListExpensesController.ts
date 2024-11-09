import { Request, Response } from "express";
import { ListExpensesService } from "../../services/expense/ListExpensesService";

// Estendendo a interface Request para incluir a propriedade user_id
interface RequestWithUser extends Request {
  user_id?: string; // user_id pode ser string ou undefined
}

class ListExpensesController {
  async handle(req: RequestWithUser, res: Response) {
    const user_id = req.user_id;

    if (!user_id) {
      return res.status(400).json({ error: "User not authenticated" });
    }

    const listExpenseService = new ListExpensesService();
    const expenses = await listExpenseService.execute(user_id);

    return res.json(expenses);
  }
}

export { ListExpensesController };
