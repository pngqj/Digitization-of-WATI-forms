import authReducer from './auth';
import tagReducer from './tags';
import courseReducer from './course';
import profReducer from './prof';
import enlargeReducer from './enlarge';
import { combineReducers} from 'redux'

const allReducers = combineReducers({
    auth: authReducer,
    tag: tagReducer,
    course: courseReducer,
    prof: profReducer,
    enlarge:enlargeReducer
})

export default allReducers