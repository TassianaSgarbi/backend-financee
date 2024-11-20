import { Request, Response } from "express";
import { EditCategoryService } from "../../services/category/EditCategoryService";

// Garantir que user_id seja tipado corretamente
interface RequestWithUser extends Request {
    user_id?: string;  // user_id pode ser string ou undefined
  }

class EditCategoryController{
    async handle(req: RequestWithUser, res: Response){
      
        const user_id = req?.user_id as string

        if(!user_id) return res.status(400).json({ error: 'User not authenticated' });

        const category_id = req?.query?.category_id as string

        const { new_name } = req?.body

        const editCategory = new EditCategoryService()

        const categoryUpdated = await editCategory.execute({
            category_id,
            new_name,
            user_id
        })

        return res.json(categoryUpdated)
    }
}

export { EditCategoryController }