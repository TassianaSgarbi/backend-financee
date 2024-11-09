import prismaClient from "../../prisma";

interface CategoryRequest {
    name: string,
    user_id: string
}

class CreateCategoryService{
    async execute({ name, user_id }: CategoryRequest){
        
        const categoryAlreadyExists = await prismaClient.category.findFirst({
            where: {
                name: name
            }
        })
        
        if(name === '' || categoryAlreadyExists){
            throw new Error("Name invalid or already exists")
        }

            const category = await prismaClient.category.create({
                data: {
                    name: name,
                    userId: user_id

                },
                select: {
                    id: true,
                    name: true
                }
            })

            return category


    }
}

export { CreateCategoryService }