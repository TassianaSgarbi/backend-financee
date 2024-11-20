import prismaClient from "../../prisma";

interface CategoryRequest{
    category_id: string,
    user_id: string
}

class DeleteCategoryService{
    async execute({category_id, user_id}: CategoryRequest){

        const deleteCategory = await prismaClient.category.delete({
            where: {
                id: category_id,
                userId: user_id
            }
        })

        return deleteCategory
    }
}

export { DeleteCategoryService }