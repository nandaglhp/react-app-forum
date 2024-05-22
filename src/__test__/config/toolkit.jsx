import { MemoryRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

const customRender = (ui, options) => {
    const { store } = options;

    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <MemoryRouter>{children}</MemoryRouter>
            </Provider>
        );
    }

    Wrapper.propTypes = {
        children: PropTypes.node.isRequired,
    };

    return render(ui, {
        wrapper: Wrapper,
        ...options,
    });
};

/* eslint-disable react-refresh/only-export-components */
export * from '@testing-library/react';
export { customRender as render };
