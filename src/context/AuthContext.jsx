import * as React from 'react';

import PropTypes from 'prop-types';
import axios from '../libs/axios';
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = React.createContext({
    token: null,
    signin: async () => { },
    signup: async () => { },
    signout: async () => { },
});

export default function AuthProvider({ children }) {
    const [token, setToken] = useLocalStorage('token', null);

    const signin = async (email, password) => {
        const { data } = await axios.post('/login', {
            email,
            password,
        });
        setToken(data.data.token);
    };

    const signup = async (name, email, password) => {
        await axios.post('/register', {
            name,
            email,
            password,
        });
    };

    const signout = () => {
        setToken(null);
    };

    return (
        /* eslint-disable-next-line react/jsx-no-constructed-context-values */
        <AuthContext.Provider value={{ token, signin, signup, signout }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
