import prismaClient from "../../prisma";

interface UserRequest {
    user_id: string
}

class DeleteUserService {
    async execute({ user_id }: UserRequest) {
        
        if (!user_id) {
            throw new Error("User not found")
        }

        const deleteExpenses = await prismaClient.expense.deleteMany({
            where: {
                userId: user_id,
            },
        })

        const deleteCategories = await prismaClient.category.deleteMany({
            where: {
                userId: user_id,
            },
        })
        

        const deleteUser = await prismaClient.user.delete({
            where: {
                id: user_id,
            },
            select: {
                id: true,
                name: true,
                cpf: true,
                email: true,
                created_at: true,
                updated_at: true
            }
        });

        return deleteUser;
    }
}

export { DeleteUserService };