import Comment from '../components/Comment';

const threadId = 'thread-91KocEqYPRz68MhD';
const comment = {
    id: 'comment-XhqYiuyhZm1mWHqn',
    content:
        'Halo!<br>Perkanalkan, nama saya Dimas, saya adalah pengguna yang bernama Dimas.',
    createdAt: '2023-05-29',
    owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
    },
    upVotesBy: [],
    downVotesBy: [],
};

export default {
    title: 'Example/Comment',
    component: Comment,
    tags: ['autodocs'],
    argTypes: {
        threadId: { control: 'text' },
        comment: { table: { expaded: true } },
    },
    args: {
        threadId,
        comment,
    },
};

export const Default = {
    args: {
        threadId,
        comment,
    },
};
