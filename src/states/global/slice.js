import {
    addComment,
    addThread,
    downvoteComment,
    downvoteThread,
    getLeaderboards,
    getThread,
    getThreads,
    getUser,
    pushComment,
    pushThread,
    setLeaderboards,
    setThread,
    setThreads,
    setUser,
    unvoteComment,
    unvoteThread,
    upvoteComment,
    upvoteThread,
} from './action';

import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        threads: [],
        leaderboards: [],
        user: null,
        category: null,
        thread: null,
        loading: false,
    },
    reducers: {
        setThreads,
        setLeaderboards,
        setUser,
        setThread,
        pushThread,
        pushComment,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getThreads.fulfilled, setThreads)
            .addCase(getLeaderboards.fulfilled, setLeaderboards)
            .addCase(getUser.fulfilled, setUser)
            .addCase(getThread.fulfilled, setThread)
            .addCase(addThread.fulfilled, pushThread)
            .addCase(addComment.fulfilled, pushComment)
            .addCase(unvoteThread.fulfilled, (state, action) => {
                state.threads = state.threads.map((thread) => {
                    if (thread.id === action.payload) {
                        thread.upVotesBy = thread.upVotesBy.filter(
                            (upvoter) => upvoter !== state.user.id
                        );
                        thread.downVotesBy = thread.downVotesBy.filter(
                            (downvoter) => downvoter !== state.user.id
                        );
                    }
                    return thread;
                });
            })
            .addCase(upvoteThread.fulfilled, (state, action) => {
                state.threads = state.threads.map((thread) => {
                    if (thread.id === action.payload) {
                        thread.upVotesBy.push(state.user.id);
                        thread.downVotesBy = thread.downVotesBy.filter(
                            (downvoter) => downvoter !== state.user.id
                        );
                    }
                    return thread;
                });
            })
            .addCase(downvoteThread.fulfilled, (state, action) => {
                state.threads = state.threads.map((thread) => {
                    if (thread.id === action.payload) {
                        thread.downVotesBy.push(state.user.id);
                        thread.upVotesBy = thread.upVotesBy.filter(
                            (upvoter) => upvoter !== state.user.id
                        );
                    }
                    return thread;
                });
            })
            .addCase(unvoteComment.fulfilled, (state, action) => {
                state.thread.comments = state.thread.comments.map((comment) => {
                    if (comment.id === action.payload) {
                        comment.upVotesBy = comment.upVotesBy.filter(
                            (upvoter) => upvoter !== state.user.id
                        );
                        comment.downVotesBy = comment.downVotesBy.filter(
                            (downvoter) => downvoter !== state.user.id
                        );
                    }
                    return comment;
                });
            })
            .addCase(upvoteComment.fulfilled, (state, action) => {
                state.thread.comments = state.thread.comments.map((comment) => {
                    if (comment.id === action.payload) {
                        comment.upVotesBy.push(state.user.id);
                    }
                    return comment;
                });
            })
            .addCase(downvoteComment.fulfilled, (state, action) => {
                state.thread.comments = state.thread.comments.map((comment) => {
                    if (comment.id === action.payload) {
                        comment.downVotesBy.push(state.user.id);
                    }
                    return comment;
                });
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
                (state) => {
                    state.loading = false;
                }
            );
    },
});

export default globalSlice.reducer;
