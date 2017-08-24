import { combineReducers } from 'redux';

import DataReducer from './reducer_data';
import TransitionsReducer from './reducer_transitions';

const rootReducer = combineReducers({
	data: DataReducer,
	transitions: TransitionsReducer
});

export default rootReducer;