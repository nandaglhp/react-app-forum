import { beforeEach, describe, expect, it, vi } from 'vitest';

import axios from '../../../libs/axios';
import { getLeaderboards } from '../../../states/global/action';

describe('getLeaderboards Thunk', () => {
    let dispatch;

    beforeEach(() => {
        dispatch = vi.fn();
    });

    it('have the correct action types', () => {
        expect(getLeaderboards).toBeDefined();

        expect(getLeaderboards.fulfilled.type).toBe(
            'global/getLeaderboards/fulfilled'
        );
        expect(getLeaderboards.pending.type).toBe(
            'global/getLeaderboards/pending'
        );
        expect(getLeaderboards.rejected.type).toBe(
            'global/getLeaderboards/rejected'
        );
    });

    it('call /leaderboards endpoints and return the response', async () => {
        const mockLeaderboardsResponse = {
            data: {
                data: {
                    leaderboards: [
                        {
                            user: {
                                id: 1,
                                name: 'User 1',
                                email: 'user1@example.com',
                                avatar: 'https://via.placeholder.com/150',
                            },
                            score: 100,
                        },
                        {
                            user: {
                                id: 2,
                                name: 'User 2',
                                email: 'user2@example.com',
                                avatar: 'https://via.placeholder.com/150',
                            },
                            score: 200,
                        },
                    ],
                },
            },
        };

        const axiosMock = vi
            .spyOn(axios, 'get')
            .mockResolvedValueOnce(mockLeaderboardsResponse);

        const getLeaderboardsFunction = getLeaderboards();
        const getLeaderboardsPromise = getLeaderboardsFunction(
            dispatch,
            () => {},
            undefined
        );

        const generatedRequestId = getLeaderboardsPromise.requestId;

        await getLeaderboardsPromise;

        expect(axiosMock).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(
            1,
            getLeaderboards.pending(generatedRequestId)
        );
        expect(dispatch).toHaveBeenNthCalledWith(
            2,
            getLeaderboards.fulfilled(
                mockLeaderboardsResponse.data.data.leaderboards,
                generatedRequestId
            )
        );
    });
});
