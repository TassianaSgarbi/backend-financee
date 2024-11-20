import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/category/DeleteCategoryService";

// Garantir que user_id seja tipado corretamente
interface RequestWithUser extends Request {
    user_id?: string;  // user_id pode ser string ou undefined
  }

class DeleteCategoryController{
    async handle(req: RequestWithUser, res: Response){

    const user_id = req?.user_id as string

    if(!user_id) return res.status(400).json({ error: 'User not authenticated' });
    
        const category_id = req.query.category_id as string

        const deleteCategory = new DeleteCategoryService()

        const categoryDeleted = await deleteCategory.execute({
            category_id,
            user_id
        })

        return res.json(categoryDeleted)

    }
}

export { DeleteCategoryController }