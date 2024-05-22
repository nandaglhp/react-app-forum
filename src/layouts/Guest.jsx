import { Outlet, useNavigate } from 'react-router-dom';

import React from 'react';
import useAuth from '../hooks/useAuth';

function Guest() {
    const { token } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (token) navigate('/');
    }, [navigate, token]);

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <Outlet />
        </div>
    );
}

export default Guest;
