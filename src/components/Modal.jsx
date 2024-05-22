import * as React from 'react';

import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from '@headlessui/react';

import PropType from 'prop-types';
import { addThread } from '../states/global/action';
import { cn } from '../libs/util';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

export default function Modal({ className = '' }) {
    const dispath = useDispatch();
    const [open, setOpen] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            body: '',
            category: '',
        },
    });

    const onSubmitHandler = async ({ title, body, category }) => {
        dispath(addThread({ title, body, category }));
        setOpen(false);
    };

    return (
        <>
            <button
                type='button'
                className={cn('btn btn-ghost', className)}
                onClick={() => setOpen(true)}>
                <span>Create Thread</span>
            </button>

            <Transition appear show={open}>
                <Dialog
                    as='div'
                    className='relative z-10 focus:outline-none'
                    open={open}
                    onClose={setOpen}>
                    <div
                        className={cn(
                            'fixed inset-0 z-10 w-screen bg-black overflow-y-auto backdrop-blur-sm',
                            'transition-all duration-300 ease-in-out',
                            open && 'bg-opacity-30'
                        )}>
                        <div className='flex items-center justify-center min-h-full p-4'>
                            <TransitionChild
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 translate-y-4 '
                                enterTo='opacity-100 translate-y-0'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 translate-y-0'
                                leaveTo='opacity-0 translate-y-4'>
                                <DialogPanel className='w-full max-w-lg p-8 border bg-base-100 rounded-xl border-base-300'>
                                    <div className='mb-6'>
                                        <DialogTitle
                                            as='h3'
                                            className='mb-2 text-2xl font-display'>
                                            Create Thread
                                        </DialogTitle>
                                        <p>
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Corporis rerum cum autem. Dicta
                                            magni, animi facere libero ea
                                            aspernatur sint.
                                        </p>
                                    </div>

                                    <form
                                        onSubmit={handleSubmit(
                                            onSubmitHandler
                                        )}>
                                        <label
                                            className='mb-4 form-control'
                                            htmlFor={register('title').name}>
                                            <div className='label'>
                                                <span className='label-text'>
                                                    Title
                                                </span>
                                            </div>

                                            <input
                                                {...register('title', {
                                                    required:
                                                        'Title is required, please enter a valid title',
                                                })}
                                                type='text'
                                                placeholder='Title'
                                                className='w-full input input-bordered'
                                            />

                                            {errors.title?.message && (
                                                <div className='label'>
                                                    <span className='label-text-alt text-error'>
                                                        {errors.title?.message}
                                                    </span>
                                                </div>
                                            )}
                                        </label>

                                        <label
                                            className='mb-4 form-control'
                                            htmlFor={register('category').name}>
                                            <div className='label'>
                                                <span className='label-text'>
                                                    Category
                                                </span>
                                            </div>

                                            <input
                                                {...register('category')}
                                                type='text'
                                                placeholder='Category'
                                                className='w-full input input-bordered'
                                            />
                                        </label>

                                        <label
                                            className='mb-6 form-control'
                                            htmlFor={register('body').name}>
                                            <div className='label'>
                                                <span className='label-text'>
                                                    Body
                                                </span>
                                            </div>

                                            <textarea
                                                {...register('body', {
                                                    required:
                                                        'Body is required, please enter a valid body',
                                                })}
                                                placeholder='Body'
                                                className='w-full py-3 text-base textarea textarea-bordered min-h-32'
                                            />

                                            {errors.body?.message && (
                                                <div className='label'>
                                                    <span className='label-text-alt text-error'>
                                                        {errors.body?.message}
                                                    </span>
                                                </div>
                                            )}
                                        </label>

                                        <div className='flex items-center justify-end space-x-2'>
                                            <button
                                                type='button'
                                                onClick={() => setOpen(false)}
                                                className='btn'>
                                                Close
                                            </button>
                                            <button
                                                type='submit'
                                                className='btn btn-primary'>
                                                Sign in
                                            </button>
                                        </div>
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

Modal.propTypes = {
    className: PropType.string,
};
