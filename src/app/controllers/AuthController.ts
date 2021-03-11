import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

class AuthController {
    async authenticate(req: Request, res: Response) {
        const repository = getRepository(User);
        const { email, password } = req.body;
        const user = await repository.findOne({ where: { email }});

        if(!user) {
            return res.sendStatus(401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return res.sendStatus(401);
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? 'cdghn8u4nf9dghi2h3dogvxn8g', { expiresIn: '1d' });

        return res.json({
            user: {
                "id": user.id,
                "email": user.email
            },
            token
        });
    }
}

export default new AuthController();