import authReducer from './auth';
import enlargeReducer from './enlarge';
import formdataReducer from './formdata';
import { combineReducers} from 'redux'

const allReducers = combineReducers({
    auth: authReducer,
    enlarge: enlargeReducer,
    formdata: formdataReducer
})

export default allReducers