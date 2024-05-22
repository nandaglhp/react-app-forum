import Chart from '../components/Chart';

const user = {
    name: 'Dimas Saputra',
    avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
    email: 'dimas@example.com',
};

const score = 10;

export default {
    title: 'Example/Chart',
    component: Chart,
    tags: ['autodocs'],
    argTypes: {
        user: { table: { expaded: true } },
        score: { control: 'number' },
    },
    args: {
        user,
        score,
    },
};

export const Default = {
    args: {
        user,
        score,
    },
};
