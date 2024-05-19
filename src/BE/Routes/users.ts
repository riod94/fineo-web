import { Hono } from "hono";
import { jwt } from "hono/jwt";
import AuthMiddleware from "../Middleware/AuthMiddleware";

const users = new Hono();
users.use('*', AuthMiddleware)
users.get('/', (c) => c.json({ message: 'Get Users' })) // GET /users
users.get('/me', (c) => c.json({ message: 'Get me' })) // GET /users/me
users.put('/me', (c) => c.json({ message: 'Update me' })) // PUT /users/me

export default users