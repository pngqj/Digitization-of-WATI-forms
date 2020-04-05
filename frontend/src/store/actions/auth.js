// import axios from 'axios';
import * as actionConst from './actionConst';
import { message} from 'antd';
import * as constants from '../../Constants'

export const authStart = () => {
    return {
        type: actionConst.AUTH_START
    }
}

export const authLoginSuccess = (token, username, is_admin) => {
    return {
        type: actionConst.AUTH_LOGIN_SUCCESS,
        token: token,
        username: username,
        is_admin: is_admin
    }
}

export const authSuccess = () => {
    return {
        type: actionConst.AUTH_SUCCESS
    }
}

export const authFail = error => {
    return {
        type: actionConst.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('username');
    localStorage.removeItem('expirationDate');
    return {
        type: actionConst.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        // axios.post(constants.host_link + '/auth/login/', {
        //     username: username,
        //     password: password
        // })
        // .then(res => {
        //     const error = res.data.error;

        //     if(error !== undefined){
        //         if(error === "invalid_user"){
        //             message.error('Invalid username/ password!');
        //         } else if(error === "email_not_verified"){
        //             message.error('You have not verified your email!');
        //             const uid = res.data.uid;
        //             localStorage.setItem('unverified_uid', uid)
        //         }
        //         dispatch(authFail(error))
        //         return
        //     }

        //     const token = res.data.token;
        //     const username = res.data.username;
        //     const is_admin = res.data.is_admin
        //     const expirationDate = new Date(new Date().getTime() + actionConst.LOGIN_EXPIRY_TIME);
        //     localStorage.setItem('token', token);
        //     localStorage.setItem('username', username);
        //     localStorage.setItem('is_admin', is_admin);
        //     localStorage.setItem('expirationDate', expirationDate);
        //     dispatch(authLoginSuccess(token,  username, is_admin));
        //     dispatch(checkAuthTimeout(3600));

        //     if(is_admin){
        //         message.success("Login as admin!")
        //     }else{
        //         message.success("Login Success!")
        //     }
            
        // })
        // .catch(err => {
        //     message.error('Invalid username/email or password!');
        //     dispatch(authFail(err))
        // })
    }
}

export const resendEmailVerification = () =>{
    return dispatch => {
        const unverified_uid = localStorage.getItem('unverified_uid');
        if (unverified_uid === null || unverified_uid === undefined){
            return
        }
        dispatch(authStart());
        // axios.post(constants.host_link + '/resend_verification_email/', {
        //     uid:unverified_uid,
        //     domain:constants.host_link
        // })
        // .then(res => {
        //     message.success("Check your Email!")
        //     dispatch(authSuccess())
        // })
        // .catch(err => {
        //     dispatch(authFail(err))
        // })
    }
}

export const resetPassword = (username) =>{
    return dispatch => {
        dispatch(authStart());
        // axios.post(constants.host_link + '/reset_password/', {
        //     username: username,
        //     domain:constants.host_link
        // })
        // .then(res => {
        //     const error = res.data.error;

        //     if(error !== undefined){
        //         if(error === "invalid_user"){
        //             message.error('Invalid username/email!');
        //         } 
        //         dispatch(authFail(error))
        //         return
        //     }

        //     message.success("Check your Email!")
        //     dispatch(authSuccess())
        // })
        // .catch(err => {
        //     dispatch(authFail(err))
        // })
    }
}

export const changePassword = (oldPassword, newPassword1, newPassword2) =>{
    return dispatch => {
        dispatch(authStart());
        // axios.post(constants.host_link + '/change_password/', {
        //     username: localStorage.getItem('username'),
        //     oldPassword: oldPassword, 
        //     newPassword: newPassword1
        // })
        // .then(res => {
        //     const error = res.data.error;

        //     if(error !== undefined){
        //         if(error === "invalid_username"){
        //             message.error('Invalid Username!');
        //         } else if(error === "invalid_password"){
        //             message.error('Wrong Password!');
        //         }
        //         dispatch(authFail(error))
        //         return
        //     }

        //    message.success("Password Changed!")
        //    dispatch(authSuccess())
        // })
        // .catch(err => {
        //     dispatch(authFail(err))
        // })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        // axios.post(constants.host_link + '/auth/register/', {
        //     username: username,
        //     email: email,
        //     password: password1,
        //     domain:constants.host_link
        // })
        // .then(res => {
        //     const error = res.data.error;
        //     if(error !== undefined){
        //         if(error === "email_in_use"){
        //             message.error('Email Already in Use!');
        //         } else if(error === "username_in_use"){
        //             message.error('Username Already in Use!');
        //         }
        //         dispatch(authFail(error))
        //         return
        //     }
        //     message.success("Sign Up Success! Check Your email!")
        //     dispatch(authSuccess())
            
        // })
        // .catch(err => {
        //     dispatch(authFail(err))
        //     if (err.response) {
        //         console.log(err.response.data)

        //         for(var i = 0; i < err.response.data.length; i++) {
        //             var error_msg = err.response.data[i];
        //             message.error(error_msg);
        //         }

        //         //print out all error msg
        //         Object.keys(err.response.data).forEach(function(key) {
        //             var error_msg = err.response.data[key];
        //             message.error(error_msg, 5);
        //         })
        //     }
        // })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const is_admin = localStorage.getItem('is_admin') === "true";    


        if (token === undefined || username === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authLoginSuccess(token,  username, is_admin));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
}
