import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { cn, formatDate } from '../libs/util';
import {
    downvoteThread,
    unvoteThread,
    upvoteThread,
} from '../states/global/action';
import { useDispatch, useSelector } from 'react-redux';

import { AxiosError } from 'axios';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';
import toast from 'react-hot-toast';

/* eslint-disable react/no-danger */
export default function Card({ thread, expanded = false }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.global.user);

    const upvoted = thread.upVotesBy.includes(user?.id);
    const downvoted = thread.downVotesBy.includes(user?.id);

    const handleVote = async (action) => {
        try {
            dispatch(unvoteThread(thread.id));

            if (action === 'up' && !upvoted) {
                dispatch(upvoteThread(thread.id));
            } else if (action === 'down' && !downvoted) {
                dispatch(downvoteThread(thread.id));
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message);
            } else toast.error(error.message);
        }
    };

    return (
        <div>
            <div className='mb-4 bg-white border border-base-300 rounded-xl'>
                <div className='flex items-center justify-between px-6 py-4 border-b border-base-300'>
                    <div className='flex items-center w-4/5 space-x-4'>
                        <img
                            src={thread.owner.avatar}
                            alt='User Avatar'
                            className='flex-none w-10 h-10 mask mask-circle'
                        />

                        <div className='flex flex-col'>
                            <h5 className='font-bold'>{thread.owner.name}</h5>
                            <h6 className='text-sm text-primary-content/50'>
                                {thread.owner.email}
                            </h6>
                        </div>
                    </div>
                    <span className='text-sm font-bold'>
                        {formatDate(thread.createdAt)}
                    </span>
                </div>
                <div className='p-6'>
                    <h3 className='font-bold'>{thread.title}</h3>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(thread.body),
                        }}
                        className={cn(
                            'prose prose-img:w-full prose-img:rounded-lg',
                            !expanded && 'line-clamp-3 '
                        )}
                    />
                </div>
            </div>

            <div className='flex items-center justify-between'>
                <div className='btn btn-sm'>{thread.category}</div>

                <div className='flex items-center space-x-2'>
                    <button
                        type='button'
                        className={cn('btn btn-sm', upvoted && 'btn-primary')}
                        onClick={() => handleVote('up')}>
                        <ThumbsUp size={16} />
                        <span>{thread.upVotesBy.length || 0}</span>
                        <span className='sr-only'>Upvotes</span>
                    </button>

                    <button
                        type='button'
                        className={cn('btn btn-sm', downvoted && 'btn-primary')}
                        onClick={() => handleVote('down')}>
                        <ThumbsDown size={16} />
                        <span>{thread.downVotesBy.length || 0}</span>
                        <span className='sr-only'>Downvotes</span>
                    </button>

                    <Link to={`/threads/${thread.id}`} className='btn btn-sm'>
                        <MessageCircle size={16} />
                        <span>{thread.totalComments}</span>
                        <span className='sr-only'>Comments</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    thread: PropType.shape({
        id: PropType.string.isRequired,
        title: PropType.string.isRequired,
        createdAt: PropType.string.isRequired,
        body: PropType.string.isRequired,
        category: PropType.string.isRequired,
        totalComments: PropType.number.isRequired,
        upVotesBy: PropType.arrayOf(PropType.string),
        downVotesBy: PropType.arrayOf(PropType.string),
        owner: PropType.shape({
            name: PropType.string.isRequired,
            avatar: PropType.string.isRequired,
            email: PropType.string.isRequired,
        }).isRequired,
    }).isRequired,
    expanded: PropType.bool.isRequired,
};
