/** @type { import('@storybook/react').Preview } */
import '../src/index.css';

import AuthProvider from '../src/context/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from '../src/states/store';

const preview = {
    parameters: {
        deepControls: { enabled: true },
        layout: 'padded',
    },
    decorators: [
        (Story) => (
            <Provider store={createStore()}>
                <MemoryRouter>
                    <AuthProvider>
                        <div className='w-content'>
                            <Story />
                        </div>
                    </AuthProvider>
                </MemoryRouter>
            </Provider>
        ),
    ],
};

export default preview;
