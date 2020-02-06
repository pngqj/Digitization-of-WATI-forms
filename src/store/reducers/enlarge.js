import * as actionConst from '../actions/actionConst';
import { updateObject } from '../utility';

const initialState = {
    enlarge: false,
    error: null,
}

const enlargeSuccess = (state, action) => {
    return updateObject(state, {
        enlarge: action.enlarge
    });
}

const reducer = (state=initialState, action) => {
    if( action.type === "enlarge"){
        return enlargeSuccess(state, action);
    }
    return state
}

export default reducer;