import prismaClient from "../../prisma";

interface ExpenseRequest{
    description: string;
    amount: number;
    due_date: string;
    category_id: string;
    user_id: string;
}

class AddExpenseService{
    async execute({ description, amount, due_date, category_id, user_id }: ExpenseRequest){

        const verifyCategory = await prismaClient.category.findFirst({
            where: {
                id: category_id,
                userId: user_id
            }
        })

        if(!verifyCategory){
            throw new Error(`Category not found or not selected`)
        }

        const expense = await prismaClient.expense.create({
            data: {
                description: description,
                amount: amount,
                due_date: due_date,
                categoryId: category_id,
                userId: user_id
            }
        })

        return expense
    }
}

export { AddExpenseService }