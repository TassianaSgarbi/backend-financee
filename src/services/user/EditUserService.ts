import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'

interface UserRequest {
    user_id: string;
    new_name: string;
    new_email: string;
    new_password: string;
    confirm_password: string;
}

class EditUserService {
    async execute({ user_id, new_name, new_email, new_password, confirm_password }: UserRequest) {
       

        // Verifica se o nome ou e-mail já existem no banco
        const nameOrEmailAlreadyExists = await prismaClient.user.findFirst({
            where: {
                OR: [
                    { name: new_name },
                    { email: new_email }
                ]
            }
        });
       

        if (nameOrEmailAlreadyExists) {
            throw new Error("name or email already exists");
        }

        

        // Valida se a senha foi confirmada corretamente
        if (new_password && !confirm_password) {
            throw new Error("confirming the new password is mandatory");
        }

       

        if (new_password !== confirm_password) {
            throw new Error("the passwords entered do not match");
        }

       

        // Verifica se há uma nova senha para ser atualizada e, se sim, realiza o hash
        let passwordHash;
        if (new_password) {
            passwordHash = await hash(new_password, 8);  // Criptografa a senha
        }

       

        // Atualiza os dados do usuário
        const editUser = await prismaClient.user.update({
            where: {
                id: user_id,
            },
            data: {
                name: new_name,
                email: new_email,
                password: passwordHash || undefined, // Atualiza a senha apenas se for fornecida
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

       

        return editUser;
    }
}

export { EditUserService }
