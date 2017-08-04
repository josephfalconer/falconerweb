import { combineReducers } from 'redux';

import DataReducer from './reducer_data';
import RegionsReducer from './reducer_regions';

const rootReducer = combineReducers({
	data: DataReducer,
	regions: RegionsReducer
});

export default rootReducer;