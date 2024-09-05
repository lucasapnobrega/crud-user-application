import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Insira o nome do usuário"),
  age: z.coerce.number({ message: "Insira a idade do usuário" }),
  email: z.string().email("Insira um e-mail válido"),
  height: z.coerce.number({ message: "Insira a altura do usuário" }),
  sex: z.string().refine(value => value !== "", {
    message: 'Selecione um sexo'
  }),
  profileImage: z.any(),
})

export type UserSchemaType = z.infer<typeof userSchema>
