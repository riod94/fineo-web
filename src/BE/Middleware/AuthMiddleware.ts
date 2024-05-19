import { createMiddleware } from "hono/factory"
import { verify } from "hono/jwt";
import { JwtAlgorithmNotImplemented, JwtHeaderInvalid, JwtTokenExpired, JwtTokenInvalid, JwtTokenIssuedAt, JwtTokenNotBefore, JwtTokenSignatureMismatched } from "hono/utils/jwt/types";

const AuthMiddleware = createMiddleware(async (c, next) => {
    const token = c.req.header('Authorization'); // get token from header
    const secret = process.env.JWT_SECRET || '';

    if (!token) {
        return c.json({ message: 'Unauthorized' }, 401);
    }

    try {
        const decoded = await verify(token, secret);
        console.log('User authenticated:', decoded);

        // run next middleware
        return next();
    } catch (error) {
        // handle JWT errors
        if (error instanceof JwtAlgorithmNotImplemented) {
            return c.json({ message: 'Unauthorized: Algorithm not implemented' }, 401);
        }
        if (error instanceof JwtTokenInvalid) {
            return c.json({ message: 'Unauthorized: Invalid token' }, 401);
        }
        if (error instanceof JwtTokenNotBefore) {
            return c.json({ message: 'Unauthorized: Token not yet valid' }, 401);
        }
        if (error instanceof JwtTokenExpired) {
            return c.json({ message: 'Unauthorized: Token expired' }, 401);
        }
        if (error instanceof JwtTokenIssuedAt) {
            return c.json({ message: 'Unauthorized: Token issued in the future' }, 401);
        }
        if (error instanceof JwtHeaderInvalid) {
            return c.json({ message: 'Unauthorized: Invalid header' }, 401);
        }
        if (error instanceof JwtTokenSignatureMismatched) {
            return c.json({ message: 'Unauthorized: Token signature mismatched' }, 401);
        }

        return c.json({ message: 'Internal server error' }, 500);
    }
    await next()
})

export default AuthMiddleware