import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '../config/toolkit';

import Comment from '../../components/Comment';
import { createStore } from '../../states/store';

describe('Comment', () => {
    let store;

    let threadId;
    let comment;

    let dispatch;

    beforeEach(() => {
        threadId = '1';

        comment = {
            id: '1',
            owner: {
                name: 'Mock Name',
                avatar: 'https://avatars.githubusercontent.com/u/1',
                email: 'mock@email.com',
            },
            content: 'Mock Content',
            createdAt: '2022-01-01T00:00:00.000Z',
            upVotesBy: [],
            downVotesBy: [],
        };

        dispatch = vi.fn();

        store = createStore();
        store.dispatch = dispatch;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders a comment with default props', () => {
        render(<Comment threadId={threadId} comment={comment} />, { store });

        expect(screen.getByText('Mock Content')).toBeInTheDocument();
        expect(screen.getByText('January 1, 2022')).toBeInTheDocument();

        expect(screen.getAllByText('0').length).toBe(2); // upvotes and downvotes count

        expect(screen.getByText('Upvotes')).toBeInTheDocument();
        expect(screen.getByText('Downvotes')).toBeInTheDocument();
    });

    it('increment upvote when user press upvote button', () => {
        render(<Comment threadId={threadId} comment={comment} />, {
            store,
        });

        const button = screen.getByText('Upvotes').parentElement;
        fireEvent.click(button);

        expect(dispatch).toHaveBeenCalledTimes(2);
    });

    it('increment downvote when user press downvote button', () => {
        render(<Comment threadId={threadId} comment={comment} />, {
            store,
        });

        const button = screen.getByText('Downvotes').parentElement;
        fireEvent.click(button);

        expect(dispatch).toHaveBeenCalledTimes(2);
    });
});
