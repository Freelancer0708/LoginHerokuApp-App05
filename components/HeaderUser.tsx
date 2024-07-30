import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthContextUser } from '../contexts/AuthContextUser';

const HeaderUser: React.FC = () => {
    const { user, setUser } = useAuthContextUser();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logoutUser');
            setUser(null);
            router.push('/user/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <header>
            {user ? (
                <>
                    <div className='header-right'>
                        <p>{user.email}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </>
            ) : (
                <>
                    <div className='header-left'>
                        <Link href="/user/login">Login</Link>
                        <Link href="/user/register">Register</Link>
                    </div>
                </>
            )}
        </header>
    );
};

export default HeaderUser;
