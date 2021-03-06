import axios from 'axios';
import * as actionConst from './actionConst';
import * as constants from '../../Constants'
import * as EncryptString from '../../EncryptString'
import { message } from 'antd';

axios.defaults.withCredentials = true;

export const authStart = () => {
    return {
        type: actionConst.AUTH_START
    }
}

export const authLoginSuccess = (username, verified) => {
    if(!verified){
        localStorage.removeItem('remember');
        localStorage.removeItem(constants.username_secret);
        localStorage.removeItem(constants.password_secret);
    }
    return {
        type: actionConst.AUTH_LOGIN_SUCCESS,
        username: username,
        verified: verified
    }
}

export const authSuccess = () => {
    return {
        type: actionConst.AUTH_SUCCESS
    }
}

export const authFail = error => {
    localStorage.removeItem('remember');
    localStorage.removeItem(constants.username_secret);
    localStorage.removeItem(constants.password_secret);
    return {
        type: actionConst.AUTH_FAIL,
        error: error,
    }
}

export const logout = () => {
    localStorage.removeItem('remember');
    localStorage.removeItem(constants.username_secret);
    localStorage.removeItem(constants.password_secret);
    axios.get(constants.host_link + '/users/signout/')
    .then(res => {
        
    })
    .catch(err => {
        console.log(err)
    })

    return {
        type: actionConst.AUTH_LOGOUT
    };
}

export const authLogin = (username, password, remember) => {
    return dispatch => {
        localStorage.setItem('remember', remember? "true": "false");
        localStorage.setItem(constants.username_secret, EncryptString.encrypt(username));
        localStorage.setItem(constants.password_secret, EncryptString.encrypt(password));
        dispatch(refreshToken(0, username, password, true))
    }
}

export const resendEmailVerification = (resendUsername, resendPassword) =>{
    return dispatch => {
        axios.post(constants.host_link + '/users/resendEmailVerification/', {
            username: resendUsername,
            password: resendPassword
        })
        .then(res => {
            message.success("Email sent! Check Your email!")
        })
        .catch(err => {
            message.error()
            console.log(err)
        })
    }
}

export const confirmEmail = (token) =>{
    return dispatch => {
        axios.post(constants.host_link + '/users/confirmEmail/',{
            token: token
        })
        .then(res => {
            message.success("Email Verified! You may now sign in. Redirecting in 5s...", 5)
            setTimeout(function(){
                window.location.href = constants.host_link + '/account/login';
             }, 5000);
        })
        .catch(err => {
            message.error("Invalid URL!")
        })
    }
}

export const resetPassword = (username) =>{
    return dispatch => {
        dispatch(authStart());
        axios.post(constants.host_link + '/reset_password/', {
            username: username,
            domain:constants.host_link
        })
        .then(res => {
            const error = res.data.error;

            if(error !== undefined){
                if(error === "invalid_user"){
                    message.error('Invalid username/email!');
                } 
                dispatch(authFail(error))
                return
            }

            message.success("Check your Email!")
            dispatch(authSuccess())
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const changePassword = (username, submitValues) =>{
    let data = submitValues
    delete submitValues.confirmPassword
    data['username'] = username
    return dispatch => {
        axios.post(constants.host_link + '/users/changePassword/', data)
        .then(res => {
            message.success("Password Changed!")
        })
        .catch(err => {
            message.error("Password Change Fail! Did you enter the correct password?")
        })
    }
}

export const authSignup = (signupData) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(constants.host_link + '/users/signup', {
            username: signupData.username,
            email: signupData.email,
            password: signupData.password,
        })
        .then(res => {
            message.success("Sign Up Success! Check Your email!")
            dispatch(authSuccess())
            console.log(res)
        })
        .catch(err => {
            dispatch(authFail(err))
            console.log(err)

        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        let remember = localStorage.getItem('remember') === "true";
        let username = localStorage.getItem(constants.username_secret);
        let password = localStorage.getItem(constants.password_secret);
        
        if (!remember || username === null || password == null) {
            dispatch(logout());
        } else {
            username = EncryptString.decrypt(username)
            password = EncryptString.decrypt(password)
            dispatch(refreshToken(0, username, password, true))
        }
    }
}

export const refreshToken = (refresh_time, username, password, displayMsg) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authStart());
            axios.post(constants.host_link + '/users/signin/',{
                username: username,
                password: password
            }).then(res => {
                if(res.data.verified){
                    dispatch(authLoginSuccess(username, true));
                    dispatch(refreshToken(constants.refresh_time, username, password, false)) 
                    if(displayMsg){
                        message.success("Login Success!")
                    }
                } else{
                    dispatch(authLoginSuccess(undefined, false));
                    if(displayMsg){
                        message.error("Email not verified!")
                    }
                }
            })
            .catch(err => {
                // dispatch(logout());
                console.log(err)
                message.error("Login Error!")
                dispatch(authFail(err));
            })
        }, refresh_time)
    }
}