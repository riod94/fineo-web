import { Hono } from "hono";
import { validate } from "../Requests/AuthRequest";
import { validator } from "hono/validator";
import AuthController from "../Controllers/AuthController";

const auth = new Hono();

auth.post('/login', validator('json', validate.AuthLogin), AuthController.login) // POST /auth/login
auth.post('/register', validator('json', validate.AuthRegister), AuthController.register) // POST /auth/register
auth.post('/forgot-password', (c) => c.json({ message: 'Forgot Password' })) // POST /auth/forgot-password
auth.post('/reset-password', (c) => c.json({ message: 'Reset Password' })) // POST /auth/reset-password

export default auth