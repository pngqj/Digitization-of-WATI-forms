import * as actionConst from '../actions/actionConst';
import { updateObject } from '../utility';

const initialState = {
    prof: null,
    error: null,
}

const profSuccess = (state, action) => {
    return updateObject(state, {
        prof: action.prof,
        error: null,
    });
}

const profError = (state, action) => {
    return updateObject(state, {
        prof: null,
        error: action.error
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionConst.PROF_DOWNLOADED: return profSuccess(state, action);
        case actionConst.PROF_ERROR: return profError(state, action);
        default:
            return state;
    }
}

export default reducer;