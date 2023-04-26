import 'dotenv/config';
import { Request, Response  } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import BarberRepository from '../repositories/BarberRepository';
import CustomerRepository from '../repositories/CustomerRepository';

class AuthController {

    async authenticateBarber(req: Request, res: Response) {
        try {

            const { email, password } = req.body;

            const barber = await BarberRepository.findUserByEmail(email);

            if (barber === null) {
                return res.status(404).json({ error: 'barber not found' });
            }

            const isPasswordCorrect = await bcrypt.compare(
                password,
                barber.password,
            );

            if (!isPasswordCorrect) {
                return res.status(401).json({ message: 'Wrong password' });
            }

            if (!process.env.JWT_SECRET) {
                return res.status(500).json({ message: 'Server error' });
            }

            const token = jwt.sign({ id: barber.id }, process.env.JWT_SECRET, {
                expiresIn: '10h',
            });

            return res.status(200).json({
                barber: {
                    id: barber.id,
                    email: barber.email,
                    name: barber.name,
                    contactNumber: barber.contactNumber,
                },
                token,
            });
        } catch (error) {
            return error;
        }
    }


    async authenticateCustomer(req: Request, res: Response) {
        try {

            const { email, password } = req.body;

            const customer = await CustomerRepository.findUserByEmail(email);

            if (customer === null) {
                return res.status(404).json({ error: 'customer not found' });
            }

            const isPasswordCorrect = await bcrypt.compare(
                password,
                customer.password,
            );

            if (!isPasswordCorrect) {
                return res.status(401).json({ message: 'Wrong password' });
            }

            if (!process.env.JWT_SECRET) {
                return res.status(500).json({ message: 'Server error' });
            }

            const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET, {
                expiresIn: '10h',
            });

            return res.status(200).json({
                barber: {
                    id: customer.id,
                    email: customer.email,
                    name: customer.name,
                    contactNumber: customer.contactNumber,
                },
                token,
            });
        } catch (error) {
            return error;
        }
    }


    async verifyToken(req: Request, res: Response) {
        const authHeader = req.headers.authorization;
        try {
            if (!process.env.JWT_SECRET || !authHeader) {
                return res.status(500).json({ message: 'Server error' });
            }
            const [, token] = authHeader.split(' ');

            jwt.verify(token.replace(/["]+/g, ''), process.env.JWT_SECRET);

            return res
                .status(200)
                .json({ message: 'Correct token', authHeader });
        } catch (error) {
            console.log(' erro', error);
            return res
                .status(401)
                .json({ message: 'Incorrect token', authHeader });
        }
    }
}

export default new AuthController();