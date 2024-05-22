import * as React from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';

function App() {
    const { token } = useAuth();

    const navigate = useNavigate();
    const dispath = useDispatch();

    React.useEffect(() => {
        if (!token) navigate('/auth/signin');
    }, [dispath, navigate, token]);

    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <main className='py-10 w-content'>
                <Outlet />
            </main>
        </div>
    );
}

export default App;
