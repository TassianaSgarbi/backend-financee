import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;

    // Verifica se o user_id está presente
    const user_id = req.user_id;
    if (!user_id) {
      return res.status(400).json({ error: 'User not authenticated' });
    }

    const createCategoryService = new CreateCategoryService();

    // Agora o user_id é garantido como uma string
    const category = await createCategoryService.execute({
      name,
      user_id
    });

    return res.json(category);
  }
}

export { CreateCategoryController };
