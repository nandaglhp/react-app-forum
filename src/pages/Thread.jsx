import * as React from 'react';

import {
    addComment,
    getThread,
    getThreads,
    getUser,
} from '../states/global/action';
import { useDispatch, useSelector } from 'react-redux';

import { AxiosError } from 'axios';
import Card from '../components/Card';
import Comment from '../components/Comment';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export default function Thread() {
    const { id } = useParams();

    const dispatch = useDispatch();
    const comments = useSelector((state) => state.global.thread?.comments);
    const selected = useSelector((state) => state.global.threads.find((t) => t.id === id));

    React.useEffect(() => {
        dispatch(getThreads());
        dispatch(getThread(id));
        dispatch(getUser());
    }, [dispatch, id]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            content: '',
        },
    });

    const onSubmitHandler = async ({ content }) => {
        try {
            dispatch(addComment({ id, content }));
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message);
            } else toast.error(error.message);
        }
    };

    return (
        <div>
            <div className='mb-8'>
                <h1 className='mb-2 text-3xl font-bold font-display'>
                    Thread Detail
                </h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Unde nostrum architecto voluptas amet itaque nemo.
                </p>
            </div>

            {selected && (
                <div className='mb-8'>
                    <Card thread={selected} expanded />
                </div>
            )}

            <div className='mb-8'>
                <h2 className='mb-2 text-xl font-display'>Thread Comments</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem, reprehenderit!
                </p>
            </div>

            <div className='grid items-start gap-8 lg:grid-cols-3'>
                <div className='flex flex-col space-y-8 lg:col-span-2'>
                    {comments?.map((comment) => (
                        <Comment
                            key={comment.id}
                            threadId={id}
                            comment={comment}
                        />
                    ))}
                </div>

                <div>
                    <div className='mb-8'>
                        <h2 className='mb-2 text-xl font-display'>
                            Add Comments
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <label
                            className='mb-6 form-control'
                            htmlFor={register('content').name}>
                            <div className='label'>
                                <span className='label-text'>Content</span>
                            </div>

                            <textarea
                                {...register('content', {
                                    required: 'Content is required',
                                })}
                                placeholder='Content'
                                className='w-full py-3 text-base textarea textarea-bordered min-h-32'
                            />

                            {errors.content?.message && (
                                <div className='label'>
                                    <span className='label-text-alt text-error'>
                                        {errors.content?.message}
                                    </span>
                                </div>
                            )}
                        </label>

                        <div className='flex justify-end'>
                            <button type='submit' className='btn btn-accent'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
