import PropType from 'prop-types';

export default function Chart({ user, score }) {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
                <img
                    src={user.avatar}
                    alt='User Avatar'
                    className='flex-none w-10 h-10 mask mask-circle'
                />

                <div className='flex flex-col'>
                    <h5 className='font-bold'>{user.name}</h5>
                    <h6 className='text-sm text-primary-content/50'>
                        {user.email}
                    </h6>
                </div>
            </div>
            <span className='font-bold'>{score}</span>
        </div>
    );
}

Chart.propTypes = {
    user: PropType.shape({
        name: PropType.string.isRequired,
        avatar: PropType.string.isRequired,
        email: PropType.string.isRequired,
    }).isRequired,
    score: PropType.number.isRequired,
};
