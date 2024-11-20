import { Request, Response } from "express";
import { EditUserService } from "../../services/user/EditUserService";

class EditUserController{
    async handle(req: Request, res: Response){

        const user_id = (req as any).req.user_id   

        const { new_name, new_email} = req.body

        const editUser = new EditUserService()

        const user = await editUser.execute({
            user_id,
            new_email,
            new_name
        })

        return res.json(user)
        

    }
}

export { EditUserController }