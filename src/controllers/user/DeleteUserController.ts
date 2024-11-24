import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

// Garantir que user_id seja tipado corretamente
interface RequestWithUser extends Request {
    user_id?: string;  // user_id pode ser string ou undefined
  }


class DeleteUserController{
    async handle(req: RequestWithUser, res: Response){

        const user_id = req.user_id as string

        const deleteUser = new DeleteUserService()

        const userDeleted = await deleteUser.execute({
            user_id
        })

        return res.json(userDeleted)
    }
}

export { DeleteUserController }