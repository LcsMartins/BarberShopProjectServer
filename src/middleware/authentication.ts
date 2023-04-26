import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface ReqWithPayload extends Request{
    payload: string | jwt.JwtPayload
}

class Authentication {

    async authenticate(
        request: any,
        response: Response,
        next: NextFunction,
    ) {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response
                .status(401)
                .json({ message: 'You are not authenticated' });
        }

        const [, token] = authHeader.split(' ');

        try {
            if (!process.env.JWT_SECRET) {
                return response.status(500).json({ message: 'Server error' });
            }

            const payload = jwt.verify(token, process.env.JWT_SECRET);

            request.payload = payload;

            return next();
        } catch (error) {
            return response.status(401).json({ message: 'Incorrect token' });
        }
    }
}

export default new Authentication();