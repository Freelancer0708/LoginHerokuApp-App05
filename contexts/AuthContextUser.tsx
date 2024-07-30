import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export type GlobalAuthState = {
    user: any | null | undefined;
    setUser: React.Dispatch<React.SetStateAction<any | null | undefined>>;
};

const initialState: GlobalAuthState = {
    user: undefined,
    setUser: () => {},
};

const AuthContext = createContext<GlobalAuthState>(initialState);

type Props = { children: ReactNode };

export const AuthProviderUser = ({ children }: Props) => {
    const [user, setUser] = useState<any | null | undefined>(initialState.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/auth/meUser', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuthContextUser = () => useContext(AuthContext);
