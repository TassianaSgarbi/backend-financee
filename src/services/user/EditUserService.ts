import prismaClient from "../../prisma";
import bcrypt from "bcryptjs"

interface UserRequest{
    user_id: string,
    new_name: string,
    new_email: string
    new_password: string
    confirm_password: string
}

class EditUserService{
    async execute({user_id, new_name, new_email, new_password, confirm_password}: UserRequest){

        const nameOrEmailAlreadyExists = await prismaClient.user.findFirst({
            where: {
                OR: [
                    { name: new_name },
                    { email: new_email }
                    ]
            }
        });

        if(nameOrEmailAlreadyExists){
            throw new Error("name or email already exists")
        }
        if(new_password && !confirm_password){
            throw new Error("confirming the new password is mandatory")
        }

        if(new_password !== confirm_password){
            throw new Error("the passwords entered do not match")
        }

        const passwordHash = await bcrypt.hash(new_password, 8)

        const editUser = await prismaClient.user.update({
            where: {
                id: user_id,
            },

            data: {
                name: new_name,
                email: new_email,
                password: passwordHash
            },
            
                select: {
                    id: true,
                    name: true,
                    email: true
                }
        })

        return editUser
    }
}

export { EditUserService }