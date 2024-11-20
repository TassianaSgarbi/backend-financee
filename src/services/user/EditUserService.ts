import prismaClient from "../../prisma";

interface UserRequest{
    user_id: string,
    new_name: string,
    new_email: string
}

class EditUserService{
    async execute({user_id, new_name, new_email}: UserRequest){

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

        const editUser = await prismaClient.user.update({
            where: {
                id: user_id,
            },
            data: {
                name: new_name,
                email: new_email
            }
        })

        return editUser
    }
}

export { EditUserService }