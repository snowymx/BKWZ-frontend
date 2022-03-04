import { createStore, combineReducers } from 'redux';
import themeReducer from './slices/theme-slice';

const rootReducer = combineReducers({
    theme: themeReducer,
});

const store = createStore(rootReducer);

export default store;