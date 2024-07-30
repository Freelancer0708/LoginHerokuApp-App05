import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContextUser } from '../../contexts/AuthContextUser';
import withAuthUser from '../../hoc/withAuthUser';

const UserPage: React.FC = () => {
    const { user } = useAuthContextUser();
    const router = useRouter();

    useEffect(() => {
        if (user === undefined) return; // 初期状態では何もせず、ユーザー状態が確定するまで待つ
        if (user === null) {
            router.push('/user/login');
        }
    }, [user, router]);

    if (user === undefined) {
        return <div>Loading...</div>; // ユーザー状態が未確定の間はローディング表示
    }

    if (user === null) {
        return null; // ユーザーがいない間は何も表示しない
    }

    return (
        <div>
            <h1>Welcome, {user.email}</h1>
            <p>This is the user dashboard.</p>
        </div>
    );
};

export default withAuthUser(UserPage);
