import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { cn, formatDate } from '../libs/util';
import {
    downvoteComment,
    unvoteComment,
    upvoteComment,
} from '../states/global/action';
import { useDispatch, useSelector } from 'react-redux';

import { AxiosError } from 'axios';
import DOMPurify from 'dompurify';
import PropType from 'prop-types';
import toast from 'react-hot-toast';

/* eslint-disable react/no-danger */
export default function Comment({ threadId, comment }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.global.user);

    const upvoted = comment.upVotesBy.includes(user?.id);
    const downvoted = comment.downVotesBy.includes(user?.id);

    const handleVoteComment = async (commentId, action) => {
        try {
            dispatch(unvoteComment({ threadId, commentId }));

            if (action === 'up' && !upvoted) {
                dispatch(upvoteComment({ threadId, commentId }));
            } else if (action === 'down' && !downvoted) {
                dispatch(downvoteComment({ threadId, commentId }));
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message);
            } else toast.error(error.message);
        }
    };

    return (
        <div>
            <div className='mb-2 bg-white border border-base-300 rounded-xl'>
                <div className='flex items-center justify-between px-6 py-4 border-b border-base-300'>
                    <div className='flex items-center space-x-4'>
                        <img
                            src={comment.owner.avatar}
                            alt='User Avatar'
                            className='flex-none w-8 h-8 mask mask-circle'
                        />

                        <div className='flex flex-col'>
                            <h5 className='font-bold'>{comment.owner.name}</h5>
                        </div>
                    </div>
                    <span className='text-sm font-bold'>
                        {formatDate(comment.createdAt)}
                    </span>
                </div>

                <div className='p-6'>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(comment.content),
                        }}
                    />
                </div>
            </div>

            <div className='flex items-center justify-end'>
                <div className='flex items-center space-x-2'>
                    <button
                        type='button'
                        className={cn('btn btn-sm', upvoted && 'btn-primary')}
                        onClick={() => handleVoteComment(comment.id, 'up')}>
                        <ThumbsUp size={16} />
                        <span>{comment.upVotesBy.length || 0}</span>
                        <span className='sr-only'>Upvotes</span>
                    </button>

                    <button
                        type='button'
                        className={cn('btn btn-sm', downvoted && 'btn-primary')}
                        onClick={() => handleVoteComment(comment.id, 'down')}>
                        <ThumbsDown size={16} />
                        <span>{comment.downVotesBy.length || 0}</span>
                        <span className='sr-only'>Downvotes</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

Comment.propTypes = {
    threadId: PropType.string.isRequired,
    comment: PropType.shape({
        id: PropType.string.isRequired,
        owner: PropType.shape({
            name: PropType.string.isRequired,
            avatar: PropType.string.isRequired,
        }).isRequired,
        content: PropType.string.isRequired,
        createdAt: PropType.string.isRequired,
        upVotesBy: PropType.arrayOf(PropType.string).isRequired,
        downVotesBy: PropType.arrayOf(PropType.string).isRequired,
    }).isRequired,
};
