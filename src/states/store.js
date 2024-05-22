import { combineReducers, configureStore } from '@reduxjs/toolkit';

import reducers from './global/slice';

export function createStore(preloadState) {
    return configureStore({
        reducer: combineReducers({
            global: reducers,
        }),
        initialState: preloadState,
    });
}

export const { dispatch } = createStore;
