import * as React from 'react';

import { getLeaderboards, getThreads, getUser } from '../states/global/action';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../components/Card';
import Chart from '../components/Chart';
import { Link } from 'react-router-dom';
import { cn } from '../libs/util';

function Home() {
    const dispatch = useDispatch();
    const [selected, setSelected] = React.useState('All');

    const threads = useSelector((state) => state.global.threads);
    const leaderboards = useSelector((state) => state.global.leaderboards);

    const categories = React.useMemo(() => {
        if (!threads) return ['All'];
        return Array.from([
            'All',
            ...new Set(threads.map((thread) => thread.category)),
        ]);
    }, [threads]);

    const filtered = React.useMemo(() => {
        if (selected === 'All') return threads;
        return threads.filter((thread) => thread.category === selected);
    }, [selected, threads]);

    React.useEffect(() => {
        dispatch(getThreads());
        dispatch(getLeaderboards());
        dispatch(getUser());
    }, [dispatch]);

    return (
        <>
            <div className='mb-8'>
                <h1 className='mb-2 text-3xl font-bold font-display'>
                    All Threads
                </h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Unde nostrum architecto voluptas amet itaque nemo.
                </p>
            </div>

            <div className='flex flex-wrap items-center w-full gap-2 mb-8'>
                {categories?.map((category) => (
                    <button
                        type='button'
                        key={category}
                        onClick={() => setSelected(category)}
                        className={cn(
                            'btn btn-sm text-start',
                            selected === category && 'btn-accent'
                        )}>
                        {category}
                    </button>
                ))}
            </div>

            <div className='grid items-start gap-8 lg:grid-cols-3'>
                <div className='flex flex-col space-y-8 lg:col-span-2'>
                    {filtered?.map((thread) => (
                        <Card
                            key={thread.id}
                            thread={thread}
                            expanded={false}
                        />
                    ))}
                </div>

                <div>
                    <div className='mb-8'>
                        <h2 className='mb-2 text-xl font-display'>
                            Current Top Leaderboards
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Autem, reprehenderit!
                        </p>
                    </div>

                    <div className='flex flex-col p-6 mb-8 space-y-4 bg-white border border-base-300 rounded-xl'>
                        {leaderboards?.slice(0, 5).map(({ user, score }) => (
                            <Chart user={user} score={score} key={user.id} />
                        ))}
                    </div>

                    <div className='flex justify-end'>
                        <Link to='/leaderboards'>
                            <button type='button' className='btn btn-primary'>
                                Full Leaderboards
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
