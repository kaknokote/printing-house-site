import { createStore, combineReducers } from 'redux';
import { userReducer } from './reducers/user-reducer';

const rootReducer = combineReducers({
	user: userReducer,
});

export const store = createStore(rootReducer);
