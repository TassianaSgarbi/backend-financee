import prismaClient from "../../prisma";

class ListCategoryService{
    async execute(user_id: string){

        const categoryList = await prismaClient.category.findMany({
            where: {
                userId: user_id
            },
            select: {
                id: true,
                name: true
            }
        })

        return categoryList

    }
}

export { ListCategoryService }