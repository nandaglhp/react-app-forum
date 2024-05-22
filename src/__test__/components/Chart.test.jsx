import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '../config/toolkit';

import Chart from '../../components/Chart';
import { createStore } from '../../states/store';

describe('Chart', () => {
    let store;
    let user;
    let score;
    let dispatch;

    beforeEach(() => {
        user = {
            name: 'User Test',
            avatar: 'https://placehold.co/600x400',
            email: 'user@test.com',
        };
        score = 90;
        store = createStore();
        dispatch = vi.fn();
        store.dispatch = dispatch;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('render a user chart with a score', () => {
        render(<Chart user={user} score={score} />, { store });

        expect(screen.getByText('User Test')).toBeInTheDocument();
        expect(screen.getByText('90')).toBeInTheDocument();
    });
});
