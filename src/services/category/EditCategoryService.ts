import prismaClient from "../../prisma";

interface CategoryRequest{
    category_id: string,
    new_name: string,
    user_id: string
}

class EditCategoryService{
    async execute({category_id, new_name, user_id}: CategoryRequest){

        const updateCategory = await prismaClient.category.update({
            where: {
                id: category_id,
                userId: user_id
              },
              data: {
                name: new_name,
              },
        })

        return updateCategory
    }
}

export { EditCategoryService }