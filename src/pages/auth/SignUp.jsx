import { Link, useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';

export default function SignUp() {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmitHandler = async ({ name, email, password }) => {
        try {
            await signup(name, email, password);
            toast.success('Sign up successful');
            navigate('/auth/signin');
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response.data.message);
            } else toast.error('Something went wrong');
        }
    };

    return (
        <div className='w-full max-w-md mx-auto'>
            <div className='mb-5'>
                <h1 className='mb-4 text-5xl font-bold font-display'>
                    Sign Up
                </h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit, minus?
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <label
                    className='mb-2 form-control'
                    htmlFor={register('name').name}>
                    <div className='label'>
                        <span className='label-text'>Name</span>
                    </div>

                    <input
                        {...register('name', {
                            required: 'Name is required',
                        })}
                        type='text'
                        placeholder='Name'
                        className='w-full input input-bordered'
                    />

                    {errors.name?.message && (
                        <div className='label'>
                            <span className='label-text-alt text-error'>
                                {errors.name?.message}
                            </span>
                        </div>
                    )}
                </label>

                <label
                    className='mb-2 form-control'
                    htmlFor={register('email').name}>
                    <div className='label'>
                        <span className='label-text'>Email address</span>
                    </div>

                    <input
                        {...register('email', {
                            required:
                                'Email is required, please enter a valid email',
                        })}
                        type='text'
                        placeholder='Email address'
                        className='w-full input input-bordered'
                    />

                    {errors.email?.message && (
                        <div className='label'>
                            <span className='label-text-alt text-error'>
                                {errors.email?.message}
                            </span>
                        </div>
                    )}
                </label>

                <label
                    className='mb-6 form-control'
                    htmlFor={register('password').name}>
                    <div className='label'>
                        <span className='label-text'>Password</span>
                    </div>

                    <input
                        {...register('password', {
                            required: 'Password is required',
                        })}
                        type='password'
                        placeholder='Password'
                        className='w-full input input-bordered'
                    />

                    {errors.password?.message && (
                        <div className='label'>
                            <span className='label-text-alt text-error'>
                                {errors.password?.message}
                            </span>
                        </div>
                    )}
                </label>

                <button type='submit' className='w-full mb-4 btn btn-primary'>
                    Sign up
                </button>

                <p className='text-center text-gray-500'>
                    Already have an account?{' '}
                    <Link to='/auth/signin' className='text-accent'>
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
}
