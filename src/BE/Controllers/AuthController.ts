import { Context } from "hono";
import { AuthLoginSchema, AuthRegisterSchema, } from "../Requests/AuthRequest";
import { sign } from "hono/jwt";

const AuthController = {
    login: (c: Context) => login(c),
    register: (c: Context) => register(c)
}

const login = async (c: Context) => {
    const body = await c.req.json()
    const { email, password } = AuthLoginSchema.parse(body)
    const secret = process.env.JWT_SECRET || ''
    const payload = {
        role: 'user',
        email: email,
        sub: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        iat: Math.floor(Date.now() / 1000), // Issued at
        nbf: Math.floor(Date.now() / 1000), // Not before
        exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
    }

    const jwt = await sign(payload, secret, "HS256")
    console.log(jwt)
    return c.json({ message: 'Login', token: jwt })
}

const register = async (c: Context) => {
    const body = await c.req.json()
    const { name } = AuthRegisterSchema.parse(body)

    return c.json({ message: 'Register', name: name })
}

export default AuthController