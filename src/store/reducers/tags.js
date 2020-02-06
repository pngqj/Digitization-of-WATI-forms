import * as actionConst from '../actions/actionConst';
import { updateObject } from '../utility';

const initialState = {
    tag: null,
    error: null,
}

const tagSuccess = (state, action) => {
    return updateObject(state, {
        tag: action.tags,
        error: null,
    });
}

const tagError = (state, action) => {
    return updateObject(state, {
        tags: null,
        error: action.error
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionConst.TAGS_DOWNLOADED: return tagSuccess(state, action);
        case actionConst.TAGS_ERROR: return tagError(state, action);
        default:
            return state;
    }
}

export default reducer;