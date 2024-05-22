import * as React from 'react';

import LoadingBar from 'react-top-loading-bar';
import Modal from './Modal';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useSelector } from 'react-redux';

function Navbar() {
    const { signout } = useAuth();
    const ref = React.useRef(null);

    const loading = useSelector((state) => state.global.loading);

    React.useEffect(() => {
        if (loading) ref.current.continuousStart();
        else ref.current.complete();
    }, [loading]);

    return (
        <>
            <nav className='py-4 border-b border-base-300'>
                <div className='flex items-center justify-between w-content p'>
                    <NavLink
                        to='/'
                        className='text-2xl text-primary font-display'>
                        Forum App
                    </NavLink>

                    <ul className='flex items-center space-x-2'>
                        <li>
                            <Modal />
                        </li>
                        <li>
                            <NavLink
                                to='/leaderboards'
                                className='btn btn-ghost'>
                                Leaderboard
                            </NavLink>
                        </li>
                        <li>
                            <button
                                type='button'
                                onClick={() => signout()}
                                className='btn btn-secondary'>
                                Sign out
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <LoadingBar
                color='#ef9fbc'
                shadowStyle={{ display: 'none' }}
                ref={ref}
            />
        </>
    );
}

export default Navbar;
