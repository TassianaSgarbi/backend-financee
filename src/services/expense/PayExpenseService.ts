import prismaClient from "../../prisma";

interface ExpenseRequest{
    expense_id: string,
    user_id: string, 
    date: string
}

class PayExpenseService{
    async execute({expense_id, user_id, date}: ExpenseRequest){

        if(!date){
            throw new Error("Invalid payment date")
        }

        const payExpense = await prismaClient.expense.update({
            where: {
                id: expense_id,
                userId: user_id
            },
            data: {
                status: true,
                payment_date: date
            }
        })

        return payExpense
    }
}

export { PayExpenseService }