import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Enter the user's name"),
  age: z.coerce.number({ message: "Enter the user's age" }),
  email: z.string().email("Enter a valid email address"),
  height: z.coerce.number({ message: "Enter the user's height" }),
  weight: z.coerce.number({ message: "Enter the user's weight" }),
  sex: z.string().refine(value => value !== "", {
    message: 'Select a gender'
  }),
  profileImage: z.any(),
})

export type UserSchemaType = z.infer<typeof userSchema>