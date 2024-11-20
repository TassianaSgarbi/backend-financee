import { Request, Response } from "express";
import { DeleteExpenseService } from "../../services/expense/DeleteExpenseService";

// Estendendo a interface Request para incluir a propriedade user_id
interface RequestWithUser extends Request {
    user_id?: string; // user_id pode ser string ou undefined
  }

class DeleteExpenseController{
    async handle(req: RequestWithUser, res: Response){

        const user_id = req.user_id

        if (!user_id) {
            return res.status(400).json({ error: "User not authenticated" });
          }
    

        const expense_id = req.query.expense_id as string

        const deleteExpense = new DeleteExpenseService()

        const deletedExpense = await deleteExpense.execute({
            user_id,
            expense_id
        })

        return res.json(deletedExpense)

    }
}

export { DeleteExpenseController }