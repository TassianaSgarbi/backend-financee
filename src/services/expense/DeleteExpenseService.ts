import prismaClient from "../../prisma";

interface DeleteRequest{
    user_id: string,
    expense_id: string
}

class DeleteExpenseService{
    async execute({user_id, expense_id}: DeleteRequest){

        const deleteExpense = await prismaClient.expense.delete({
            where: {
                userId: user_id,
                id: expense_id
            }
        })

        if(!deleteExpense){
            throw new Error("Expense not found")
        }

        return deleteExpense

    }
}

export { DeleteExpenseService }