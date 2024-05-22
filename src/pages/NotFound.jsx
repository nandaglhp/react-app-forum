import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <main className='flex items-center justify-center h-screen'>
            <div className='flex flex-col items-center justify-center w-full max-w-md space-y-6 text-center'>
                <h1 className='text-6xl font-bold font-display'>404</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ducimus, voluptates animi. Voluptatum eaque fuga molestias
                    illum obcaecati maxime reiciendis ex.
                </p>
                <div className='flex items-center space-x-4'>
                    <Link to='/' className='btn btn-primary'>
                        Go back to home
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default NotFound;
