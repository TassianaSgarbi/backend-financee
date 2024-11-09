import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/expense/ListByCategoryService";

// Estendendo a interface Request para incluir a propriedade user_id
interface RequestWithUser extends Request {
  user_id?: string; // user_id pode ser string ou undefined
}

class ListByCategoryController {
  async handle(req: RequestWithUser, res: Response) {
    const category_id = req.query.category_id as string;
    const user_id = req.user_id;

    if (!user_id) {
      return res.status(400).json({ error: "User not authenticated" });
    }

    const listByCategory = new ListByCategoryService();
    const expenses = await listByCategory.execute({
      category_id,
      user_id
    });

    return res.json(expenses);
  }
}

export { ListByCategoryController };
