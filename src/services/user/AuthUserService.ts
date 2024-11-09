import prismaClient from "../../prisma";
import { compare } from "bcryptjs"
import { sign } from 'jsonwebtoken'
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

if (!jwtSecret) {
    throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.");
  }
  

interface AuthRequest{
    email: string
    password: string
}

class AuthUserService {
    async execute({ email, password}: AuthRequest){

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(!user){
            throw new Error("User or password incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("User or password incorrect")
        }

        const token = jwt.sign(
            {
              name: user.name,
              email: user.email
            },
            jwtSecret,  // Utilizando o jwtSecret já validado como existente
            {
              subject: user.id,
              expiresIn: '30d'
            }
          );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token

        }

    }
}

export { AuthUserService }