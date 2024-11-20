import prismaClient from "../../prisma";

interface UserRequest{
    user_id: string,
    new_name: string,
    new_email: string
    new_password: string
}

class EditUserService{
    async execute({user_id, new_name, new_email,new_password}: UserRequest){

        const nameOrEmailAlreadyExists = await prismaClient.user.findFirst({
            where: {
                OR: [
                    { name: new_name },
                    { email: new_email },
                    { password: new_password}
                ]
            }
        });

        if(nameOrEmailAlreadyExists){
            throw new Error("name or email already exists")
        }

        const editUser = await prismaClient.user.update({
            where: {
                id: user_id,
            },
            data: {
                name: new_name,
                email: new_email,
                password:new_password
            }
        })

        return editUser
    }
}

export { EditUserService }