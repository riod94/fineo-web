import { Hono } from "hono";
import AuthMiddleware from "../Middleware/AuthMiddleware";

const transactions = new Hono();
transactions.use('*', AuthMiddleware)
transactions.get('/', (c) => c.json({ message: 'List Books' })) // GET /transactions
transactions.get('/:id', (c) => {
    // GET /transactions/:id
    const id = c.req.param('id')
    return c.json({ message: 'Get transactions: ' + id })
})
transactions.post('/', (c) => c.json({ message: 'Create transactions' }, 201)) // POST /transactions
transactions.put('/:id', (c) => {
    // PUT /transactions/:id
    const id = c.req.param('id')
    return c.json({ message: 'Update transactions: ' + id })
})
transactions.delete('/:id', (c) => {
    // DELETE /transactions/:id
    const id = c.req.param('id')
    return c.json({ message: 'Delete transactions: ' + id })
})

export default transactions