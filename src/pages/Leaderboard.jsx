import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Chart from '../components/Chart';
import { cn } from '../libs/util';
import { getLeaderboards } from '../states/global/action';

export default function Leaderboard() {
    const dispatch = useDispatch();
    const leaderboards = useSelector((state) => state.global.leaderboards);

    React.useEffect(() => {
        dispatch(getLeaderboards());
    }, [dispatch]);

    const tops = [
        {
            leaderboard: leaderboards.at(1),
            label: 'Second Place',
            height: 150 * 2,
            color: 'bg-secondary',
        },
        {
            leaderboard: leaderboards.at(0),
            label: 'First Place',
            height: 150 * 3,
            color: 'bg-primary',
        },
        {
            leaderboard: leaderboards.at(2),
            label: 'Third Place',
            height: 150 * 1,
            color: 'bg-accent',
        },
    ];

    return (
        <div>
            <div className='mb-8'>
                <h1 className='mb-2 text-3xl font-bold font-display'>
                    Leaderboard
                </h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Unde nostrum architecto voluptas amet itaque nemo.
                </p>
            </div>

            <div className='grid gap-8 lg:grid-cols-2'>
                <div className='flex flex-col order-2 p-6 mb-8 space-y-4 bg-white border border-base-300 rounded-xl lg:order-1'>
                    {leaderboards?.map(({ user, score }) => (
                        <Chart user={user} score={score} key={user.id} />
                    ))}
                </div>

                <div className='grid items-end order-1 w-full max-w-xl grid-cols-3 gap-8 mx-auto mb-8 lg:order-2'>
                    {tops.map(({ leaderboard, label, height, color }) => {
                        if (!leaderboard) return null;
                        return (
                            <div
                                key={leaderboard.user.id}
                                className='flex flex-col items-center justify-end space-y-4'>
                                <img
                                    src={leaderboard.user.avatar}
                                    alt={leaderboard.user.name}
                                    className='w-16 h-16 mask mask-squircle'
                                />
                                <div
                                    className={cn(
                                        'flex items-center justify-center w-full rounded-xl',
                                        color
                                    )}
                                    style={{ height }}>
                                    <span className='text-3xl text-white font-display'>
                                        {leaderboard.score}
                                    </span>
                                </div>
                                <span className='font-bold'>{label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
