import prismaClient from "../../prisma";

interface ExpanseRequest{
    category_id: string,
    user_id: string
}

class ListByCategoryService{
    async execute({category_id, user_id}: ExpanseRequest){
        
        const findByCategory = await prismaClient.expense.findMany({
            where: {
                categoryId: category_id,
                userId: user_id
            }
        })
        
        if (!category_id || findByCategory.length === 0) {
            throw new Error(`This category does not exist or there are no expenses for this category`);
        }
        
        return findByCategory
    }
}

export { ListByCategoryService }