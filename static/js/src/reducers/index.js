import { combineReducers } from 'redux';

import DataReducer from './data';
import TransitionsReducer from './transitions';

const rootReducer = combineReducers({
	data: DataReducer,
	transitions: TransitionsReducer
});

export default rootReducer;