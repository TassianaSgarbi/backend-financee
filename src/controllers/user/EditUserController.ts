import { Request, Response } from "express";
import { EditUserService } from "../../services/user/EditUserService";

// Garantir que user_id seja tipado corretamente
interface RequestWithUser extends Request {
    user_id?: string;  // user_id pode ser string ou undefined
  }

class EditUserController{
    async handle(req: RequestWithUser, res: Response){

        const user_id = req?.user_id as string

        // if(!user_id) return res.status(400).json({ error: 'User not authenticated' });
        
        const { new_name, new_email, new_password, confirm_password} = req.body

        const editUser = new EditUserService()

        const user = await editUser.execute({
            user_id,
            new_email,
            new_name,
            new_password,
            confirm_password
        })

        return res.json(user)
        

    }
}

export { EditUserController }