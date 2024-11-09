import prismaClient from "../../prisma";

class ListExpensesService{
    async execute(user_id: string){

        const expensesList = await prismaClient.expense.findMany({
            where: {
                userId: user_id
            }
        })

        if(!expensesList){
            throw new Error("No expenses found")
        }
        return expensesList
    }
}

export { ListExpensesService }