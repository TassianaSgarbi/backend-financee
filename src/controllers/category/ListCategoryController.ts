import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

// Garantir que user_id seja tipado corretamente
interface RequestWithUser extends Request {
  user_id?: string;  // user_id pode ser string ou undefined
}

class ListCategoryController {
  async handle(req: RequestWithUser, res: Response) {
    const user_id = req.user_id;

    // Verifica se o user_id está presente
    if (!user_id) {
      return res.status(400).json({ error: 'User not authenticated' });
    }

    const listCategoryService = new ListCategoryService();

    // Passando o user_id com certeza de que é uma string
    const categories = await listCategoryService.execute(user_id);

    return res.json(categories);
  }
}

export { ListCategoryController };
