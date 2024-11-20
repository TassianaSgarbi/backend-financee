import prismaClient from "../../prisma";

interface ExpenseRequest{
    expense_id: string,
    user_id: string,
    new_status: boolean
}

class PayExpenseService{
    async execute({expense_id, user_id, new_status}: ExpenseRequest){

        const payExpense = await prismaClient.expense.update({
            where: {
                id: expense_id,
                userId: user_id
            },
            data: {
                status: new_status
            }
        })

        return payExpense
    }
}

export { PayExpenseService }