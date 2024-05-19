import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { auth, transactions, todos, users } from '@/BE/Routes';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';

export const runtime = 'edge';

const app = new Hono().basePath('/api')

app.use(logger())
app.use('*', cors())
app.use('*', secureHeaders())

app.get('/', (c) => {
  return c.json({
    message: 'Hono',
  })
})
app.route('auth', auth)
app.route('todos', todos)
app.route('transactions', transactions)
app.route('users', users)

app.onError((err, c) => {
  // Handle HTTP exceptions
  if (err instanceof HTTPException) {
    // Handle Invalid HTTP headers
    if (err.status === 400 && err.message.includes('Invalid HTTP header:')) {
      const headerName = err.message.split(':')[1].trim();
      return c.json({ message: `Invalid HTTP header: ${headerName}` }, 400);
    }

    // Handle Malformed JSON
    if (err.status === 400 && err.message.includes('Malformed JSON in request body')) {
      return c.json({ message: 'Malformed JSON in request body' }, 400);
    }

    return c.json({ error: err.message }, err.status);
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const validationErrors = err?.issues?.reduce((acc: any, issue: any) => {
      acc[issue?.path?.join('.')] = issue?.message;
      return acc;
    }, {});

    return c.json({ message: 'Invalid data', errors: validationErrors }, 422);

  }

  // Handle other errors
  return c.json({ error: 'Something went wrong. Please try again later' }, 500);
});

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)