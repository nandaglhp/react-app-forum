import { beforeEach, describe, expect, it, vi } from 'vitest';

import axios from '../../../libs/axios';
import { getThreads } from '../../../states/global/action';

describe('getThreads Thunk', () => {
    let dispatch;

    beforeEach(() => {
        dispatch = vi.fn();
    });

    it('have the correct action types', () => {
        expect(getThreads).toBeDefined();

        expect(getThreads.fulfilled.type).toBe('global/getThreads/fulfilled');
        expect(getThreads.pending.type).toBe('global/getThreads/pending');
        expect(getThreads.rejected.type).toBe('global/getThreads/rejected');
    });

    it('call /threads and /users endpoints and return the response', async () => {
        const mockThreadsResponse = {
            data: {
                data: {
                    threads: [
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
                },
            },
        };

        const mockUsersResponse = {
            data: {
                data: {
                    users: [
                        {
                            id: 1,
                            name: 'User 1',
                        },
                        {
                            id: 2,
                            name: 'User 2',
                        },
                    ],
                },
            },
        };

        const axiosMock = vi
            .spyOn(axios, 'get')
            .mockResolvedValueOnce(mockThreadsResponse)
            .mockResolvedValueOnce(mockUsersResponse);

        const getThreadsFunction = getThreads();
        const getThreadsPromise = getThreadsFunction(
            dispatch,
            () => {},
            undefined
        );

        const generatedRequestId = getThreadsPromise.requestId;

        await getThreadsPromise;

        expect(axiosMock).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(
            1,
            getThreads.pending(generatedRequestId)
        );
        expect(dispatch).toHaveBeenNthCalledWith(
            2,
            getThreads.fulfilled(
                mockThreadsResponse.data.data.threads.map((thread) => ({
                    ...thread,
                    owner: mockUsersResponse.data.data.users.find(
                        (user) => user.id === thread.ownerId
                    ),
                })),
                generatedRequestId
            )
        );
    });
});
