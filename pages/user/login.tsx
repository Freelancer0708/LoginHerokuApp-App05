import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuthContextUser } from '../../contexts/AuthContextUser';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { user, setUser } = useAuthContextUser();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('/api/auth/loginUser', { email, password });
            setUser(response.data.user);
            setTimeout(() => {
                router.push('/user');
            }, 100); // 100ミリ秒待機
        } catch (error: any) {
            console.error(error);
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    useEffect(() => {
        if (user) {
            router.push('/user');
        }
    }, [user, router]);

    return (
        <div>
            <section className='login'>
                <h1>ログイン画面</h1>
                <form onSubmit={handleSubmit} className='login-form'>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="メールアドレス"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="パスワード"
                        required
                    />
                    <button type="submit">ログイン</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </section>
        </div>
    );
};

export default LoginPage;
