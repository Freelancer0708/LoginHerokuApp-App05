import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import sequelize from '../../../db';

sequelize.sync();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { email, password } = req.body;

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ user: newUser });
    } catch (error: any) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
