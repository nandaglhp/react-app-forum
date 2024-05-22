import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '../config/toolkit';

import Card from '../../components/Card';
import { createStore } from '../../states/store';

describe('Card', () => {
    let store;
    let thread;
    let dispatch;

    beforeEach(() => {
        thread = {
            id: '1',
            title: 'Mock Title',
            createdAt: '2022-01-01T00:00:00.000Z',
            body: 'Mock Body',
            category: 'Mock Category',
            totalComments: 1,
            upVotesBy: [],
            downVotesBy: [],
            owner: {
                name: 'Mock Name',
                avatar: 'https://avatars.githubusercontent.com/u/1',
                email: 'mock@email.com',
            },
        };
        dispatch = vi.fn();
        store = createStore();
        store.dispatch = dispatch;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders a card with default props', () => {
        render(<Card thread={thread} expanded={false} />, { store });

        expect(screen.getByText('Mock Title')).toBeInTheDocument();
        expect(screen.getByText('Mock Body')).toBeInTheDocument();
        expect(screen.getByText('Mock Category')).toBeInTheDocument();
        expect(screen.getByText('January 1, 2022')).toBeInTheDocument();

        expect(screen.getAllByText('0').length).toBe(2); // upvotes and downvotes count
        expect(screen.getAllByText('1').length).toBe(1); // comments count

        expect(screen.getByText('Upvotes')).toBeInTheDocument();
        expect(screen.getByText('Downvotes')).toBeInTheDocument();
        expect(screen.getByText('Comments')).toBeInTheDocument();
    });

    it('renders a card with expanded body', () => {
        render(<Card thread={thread} expanded />, { store });

        expect(screen.getByText('Mock Body')).not.toHaveClass('line-clamp-3');
    });

    it('increment upvote when user press upvote button', () => {
        render(<Card thread={thread} expanded />, { store });

        const button = screen.getByText('Upvotes').parentElement;
        fireEvent.click(button);

        expect(dispatch).toHaveBeenCalledTimes(2);
    });

    it('increment downvote when user press downvote button', () => {
        render(<Card thread={thread} expanded />, { store });

        const button = screen.getByText('Downvotes').parentElement;
        fireEvent.click(button);

        expect(dispatch).toHaveBeenCalledTimes(2);
    });
});
