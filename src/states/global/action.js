import axios from '../../libs/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const setThreads = (state, action) => {
    state.threads = action.payload;
};

export const setLeaderboards = (state, action) => {
    state.leaderboards = action.payload;
};

export const setUser = (state, action) => {
    state.user = action.payload;
};

export const setThread = (state, action) => {
    state.thread = action.payload;
};

export const pushThread = (state, action) => {
    state.threads.push(action.payload);
};

export const pushComment = (state, action) => {
    state.thread.comments.push(action.payload);
};

export const getThreads = createAsyncThunk('global/getThreads', async () => {
    const [threadsResponse, usersResponse] = await Promise.all([
        axios.get('/threads'),
        axios.get('/users'),
    ]);

    const { data: threadsData } = threadsResponse;
    const { data: usersData } = usersResponse;

    return threadsData.data.threads.map((thread) => ({
            ...thread,
            owner: usersData.data.users.find(
                (user) => user.id === thread.ownerId
            ),
        }));
});

export const getLeaderboards = createAsyncThunk(
    'global/getLeaderboards',
    async () => {
        const { data } = await axios.get('/leaderboards');
        return data.data.leaderboards;
    }
);

export const getUser = createAsyncThunk('global/getUser', async () => {
    const { data } = await axios.get('/users/me');
    return data.data.user;
});

export const unvoteThread = createAsyncThunk(
    'global/unvoteThread',
    async (id) => {
        axios.post(`/threads/${id}/neutral-vote`);
        return id;
    }
);

export const upvoteThread = createAsyncThunk(
    'global/upvoteThread',
    async (id) => {
        axios.post(`/threads/${id}/up-vote`);
        return id;
    }
);

export const downvoteThread = createAsyncThunk(
    'global/downvoteThread',
    async (id) => {
        axios.post(`/threads/${id}/down-vote`);
        return id;
    }
);

export const addThread = createAsyncThunk(
    'global/addThread',
    async ({ title, body, category }) => {
        const { data } = await axios.post('/threads', {
            title,
            body,
            category,
        });
        const { data: userData } = await axios.get('/users/me');
        return {
            ...data.data.thread,
            owner: userData.data.user,
        };
    }
);

export const getThread = createAsyncThunk('global/getThread', async (id) => {
    const { data } = await axios.get(`/threads/${id}`);
    return data.data.detailThread;
});

export const unvoteComment = createAsyncThunk(
    'global/unvoteComment',
    async ({ threadId, commentId }) => {
        axios.post(`/threads/${threadId}/comments/${commentId}/neutral-vote`);
        return commentId;
    }
);

export const upvoteComment = createAsyncThunk(
    'global/upvoteComment',
    async ({ threadId, commentId }) => {
        axios.post(`/threads/${threadId}/comments/${commentId}/up-vote`);
        return commentId;
    }
);

export const downvoteComment = createAsyncThunk(
    'global/downvoteComment',
    async ({ threadId, commentId }) => {
        axios.post(`/threads/${threadId}/comments/${commentId}/down-vote`);
        return commentId;
    }
);

export const addComment = createAsyncThunk(
    'global/addComment',
    async ({ id, content }) => {
        const { data } = await axios.post(`/threads/${id}/comments`, {
            content,
        });
        return data.data.comment;
    }
);
