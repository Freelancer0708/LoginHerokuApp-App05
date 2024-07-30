import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import sequelize from '../../../db';

sequelize.sync();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id, role: 'user' }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        res.setHeader('Set-Cookie', cookie.serialize('userToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 3600,
            sameSite: 'strict',
            path: '/'
        }));

        return res.status(200).json({ user });
    } catch (error: any) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
