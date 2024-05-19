import { Context } from "hono";
import { z } from "zod";

const AuthRegisterSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(8, "Password must be at least 8 characters long"),
}).required()

const AuthLoginSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(8, "Password must be at least 8 characters long"),
}).required()

function AuthLogin(value: any, c: Context) {
    if (c.req.path != '/auth/login') {
        return;
    }

    const parsed = AuthLoginSchema.safeParse(value)

    if (!parsed.success) {
        return c.json({
            mesaage: 'Invalid name',
            error: parsed.error.issues
        })
    }

    return parsed.data
}

function AuthRegister(value: any, c: Context) {
    if (c.req.path != '/auth/register') {
        return;
    }

    const parsed = AuthRegisterSchema.safeParse(value)

    if (!parsed.success) {
        return c.json({
            mesaage: 'Invalid name',
            error: parsed.error.issues
        })
    }

    return parsed.data
}

const validate = {
    AuthLogin: (value: any, c: Context) => AuthLogin(value, c),
    AuthRegister: (value: any, c: Context) => AuthRegister(value, c)
}

export { validate, AuthRegisterSchema, AuthLoginSchema }