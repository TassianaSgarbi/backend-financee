import prismaClient from "../../prisma";

interface ExpenseRequest{
    description: string;
    amount: number;
    due_date: string;
    category_id: string;
    user_id: string;
    [key: string]: any;
}

class AddExpenseService{
    async execute({ description, amount, due_date, category_id, user_id, ...optionalFields }: ExpenseRequest){

        const verifyCategory = await prismaClient.category.findFirst({
            where: {
                id: category_id,
                userId: user_id
            }
        })

        if(!verifyCategory){
            throw new Error(`Category not found or not selected`)
        }

    
        const expenseAlreadyExists = await prismaClient.expense.findFirst({
            where: {
                description: description
            }
        })

        if(expenseAlreadyExists) {
            throw new Error(`Expense '${description}' already exists`)
        }

    
        const expense = await prismaClient.expense.create({
            data: {
                description: description,
                amount: amount,
                due_date: due_date,
                categoryId: category_id,
                userId: user_id,
                ...optionalFields
            }
        })

        return expense
    }
}

export { AddExpenseService }