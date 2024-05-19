import { Hono } from "hono";
import AuthMiddleware from "../Middleware/AuthMiddleware";

const todos = new Hono();
todos.use('*', AuthMiddleware)
todos.get('/', (c) => c.json({ message: 'List Books' })) // GET /todos
todos.get('/:id', (c) => {
    // GET /todos/:id
    const id = c.req.param('id')
    return c.json({ message: 'Get todos: ' + id })
})
todos.post('/', (c) => c.json({ message: 'Create todos' })) // POST /todos
todos.put('/:id', (c) => {
    // PUT /todos/:id
    const id = c.req.param('id')
    return c.json({ message: 'Update todos: ' + id })
})
todos.delete('/:id', (c) => {
    // DELETE /todos/:id
    const id = c.req.param('id')
    return c.json({ message: 'Delete todos: ' + id })
})

export default todos