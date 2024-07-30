import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.userToken;
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        if (decoded.role !== 'user') {
            return res.status(401).json({ message: 'Invalid token: not a user' });
        }

        const user = await User.findByPk(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
