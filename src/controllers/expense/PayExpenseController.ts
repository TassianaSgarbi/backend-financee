import { Request, Response } from "express";
import { PayExpenseService } from "../../services/expense/PayExpenseService";

// Estendendo a interface Request para incluir a propriedade user_id
interface RequestWithUser extends Request {
    user_id?: string; // user_id pode ser string ou undefined
  }


class PayExpenseController{
    async handle(req: RequestWithUser, res: Response){
        
        const user_id = req.user_id
        
    if (!user_id) {
        return res.status(400).json({ error: "User not authenticated" });
      }

        const expense_id = req.query.expense_id as string

        const payExpense = new PayExpenseService()
        
        const paidExpense = await payExpense.execute({
            expense_id,
            user_id
        })

        return res.json(paidExpense)

    }
}

export { PayExpenseController }