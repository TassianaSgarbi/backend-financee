import prismaClient from "../../prisma";

interface ExpenseRequest{
    expense_id: string
    user_id: string
}

class DetailExpenseService{
    async execute({expense_id, user_id}: ExpenseRequest){

        const expenseDetail = await prismaClient.expense.findFirst({
            where: {
                id: expense_id,
                userId: user_id
            }
        })

        if(!expenseDetail){
            throw new Error("Expense not found")
        }

        return expenseDetail
    }
}

export { DetailExpenseService }