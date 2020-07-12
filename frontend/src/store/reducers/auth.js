import * as actionConst from '../actions/actionConst';
import { updateObject } from '../utility';

const initialState = {
    error: null, 
    username:null,
    verified: null,
    initial:true
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        username:null,
        verified: null
    });
}

const authLoginSuccess = (state, action) => {
    return updateObject(state, {
        username: action.username,
        verified: action.verified,
        error: null,
        initial:false
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        username: undefined,
        verified: null,
        initial:false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        username:undefined,
        verified: null,
        initial:false
    });
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionConst.AUTH_START: return authStart(state, action);
        case actionConst.AUTH_LOGIN_SUCCESS: return authLoginSuccess(state, action);
        case actionConst.AUTH_SUCCESS: return authSuccess(state, action);
        case actionConst.AUTH_FAIL: return authFail(state, action);
        case actionConst.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;