import * as actionConst from '../actions/actionConst';
import { updateObject } from '../utility';

const initialState = {
    course: null,
    error: null,
}

const courseSuccess = (state, action) => {
    return updateObject(state, {
        course: action.course,
        error: null,
    });
}

const courseError = (state, action) => {
    return updateObject(state, {
        course: null,
        error: action.error
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionConst.COURSE_DOWNLOADED: return courseSuccess(state, action);
        case actionConst.COURSE_ERROR: return courseError(state, action);
        default:
            return state;
    }
}

export default reducer;