import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from '../layouts/App';
import Guest from '../layouts/Guest';
import Home from '../pages/Home';
import Leaderboard from '../pages/Leaderboard';
import NotFound from '../pages/NotFound';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import Thread from '../pages/Thread';
import { Toaster } from 'react-hot-toast';

export default function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route index element={<Home />} />
                        <Route path='threads/:id' element={<Thread />} />
                        <Route path='leaderboards' element={<Leaderboard />} />
                    </Route>

                    <Route path='/auth' element={<Guest />}>
                        <Route path='signin' element={<SignIn />} />
                        <Route path='signup' element={<SignUp />} />
                    </Route>

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>

            <Toaster
                position='bottom-right'
                toastOptions={{
                    className: 'border border-base-300',
                    style: {
                        boxShadow: 'none',
                        borderRadius: '9999px',
                        padding: '1rem 1.5rem',
                    },
                }}
            />
        </>
    );
}
