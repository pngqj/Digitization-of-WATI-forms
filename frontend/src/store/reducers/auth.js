import * as actionConst from '../actions/actionConst';
import { updateObject } from '../utility';

const initialState = {
    is_admin: false,
    token: null,
    error: null, 
    username:null,
    loading: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authLoginSuccess = (state, action) => {
    return updateObject(state, {
        is_admin: action.is_admin, 
        token: action.token,
        username: action.username,
        error: null,
        loading: false
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        is_admin: false,
        token: null,
        username:null
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