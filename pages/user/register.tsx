import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuthContextUser } from '../../contexts/AuthContextUser';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuthContextUser();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await axios.post('/api/auth/registerUser', { email, password });
            router.push('/user/login');
        } catch (error: any) {
            console.error(error);
            setError(error.response?.data?.message || 'Registration failed');
        }
    };

    if (user) {
        router.push('/user');
        return null;
    }

    return (
        <div>
            <section className='register'>
                <h1>ユーザー登録画面</h1>
                <form onSubmit={handleSubmit} className='register-form'>
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
                    <button type="submit">登録</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </section>
        </div>
    );
};

export default RegisterPage;
