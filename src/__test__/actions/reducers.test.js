import { describe, expect, it } from 'vitest';
import {
    setLeaderboards,
    setThreads,
    setUser,
} from '../../states/global/action';

describe('Reducers', () => {
    it('setThreads reducer should set the threads when called', () => {
        const previousState = {
            threads: [],
        };

        const mockData = {
            payload: [
                {
                    id: 1,
                    title: 'Thread 1',
                    ownerId: 1,
                },
                {
                    id: 2,
                    title: 'Thread 2',
                    ownerId: 2,
                },
            ],
        };

        setThreads(previousState, mockData);
        expect(previousState.threads).toEqual([]);
    });

    it('setLeaderboard reducer should set the leaderboard when called', () => {
        const previousState = {
            leaderboards: [],
        };

        const mockData = {
            payload: [
                {
                    user: {
                        id: 1,
                        name: 'User 1',
                        image: 'https://via.placeholder.com/150',
                    },
                    score: 10,
                },
                {
                    user: {
                        id: 2,
                        name: 'User 2',
                        image: 'https://via.placeholder.com/150',
                    },
                    score: 20,
                },
            ],
        };

        setLeaderboards(previousState, mockData);
        expect(previousState.leaderboards).toEqual(mockData.payload);
    });

    it('setUser reducer should set the user when called', () => {
        const previousState = {
            user: {
                id: 1,
                name: 'User 1',
                image: 'https://via.placeholder.com/150',
            },
        };

        const mockData = {
            payload: {
                id: 1,
                name: 'User 1',
                image: 'https://via.placeholder.com/150',
            },
        };

        setUser(previousState, mockData);
        expect(previousState.user).toEqual(mockData.payload);
    });
});
