
import { setCookie, getCookie } from '../../utils/coockie';
import { API_AUTH, API_ADDRESS } from '../../constants';
export const STORE_NAME = 'auth';

export const SET_USER_DATA = 'SET_USER_DATA';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const UPDATE_USER_DATA_ERROR = 'UPDATE_USER_DATA_ERROR';

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SENDING = 'REGISTER_SENDING';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_ERROR = 'TOKEN_ERROR';

export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_ERROR = 'USER_ERROR';

export function checkResponse(response) {
    if (response.status !== 200) {
        throw new Error(response.status);
    }
    return response.json();
}

export function register({ name, email, password }) { 
    return (dispatch) => {
        fetch(`${API_AUTH}/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ name, email, password }),
        })
            .then(response => {
                dispatch({
                    type: REGISTER_SENDING,
                });
                console.log(JSON.stringify({"email": email, "password": password, "name": name }))
                return checkResponse(response); 
            })
            .then(data => {
                console.log(data);
                dispatch({
                    type: SET_USER_DATA,
                    payload: data.user,
                });
                setCookie('accessToken', data.accessToken);
                setCookie('refreshToken', data.refreshToken);
            })
            .catch((error) => {
                console.log('error', error);
                dispatch({
                    type: REGISTER_ERROR,
                    payload: error,
                });
            });
    }
}

export function updateUserData({ name, email, password }) {
    return (dispatch) => {
        fetch(`${API_AUTH}/user`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              "Authorization": getCookie('accessToken'),
            },
            body: JSON.stringify({ name, email, password }),
        })
            .then(checkResponse)
            .then(data => {
                console.log('data', data);
                dispatch({
                    type: UPDATE_USER_DATA,
                    payload: data.user,
                })
            })
            .catch((error) => {
                console.log('error', error);
                dispatch({
                    type: UPDATE_USER_DATA_ERROR,
                    payload: error,
                })
            });
    }
}

export function loginUser({ email, password }) {
    return (dispatch) => {
        fetch(`${API_AUTH}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ email, password }),
        })
            .then(checkResponse)
            .then(data => {
                console.log(data);
                dispatch({
                    type: LOGIN_USER,
                    payload: data.user,
                });
                setCookie('accessToken', data.accessToken);
                setCookie('refreshToken', data.refreshToken);
            })
            .catch((error) => {
                console.log('error', error);
                dispatch({
                    type: LOGIN_USER_ERROR,
                    payload: error,
                })
            });
    }
}

export function forgotPassword({ email }) {
    return (dispatch) => {
        fetch(`${API_ADDRESS}/password-reset`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ email }),
        })
            .then(checkResponse)
            .then(data => {
                console.log('data', data);
                dispatch({
                    type: FORGOT_PASSWORD,
                });
            })
            .catch((error) => {
                console.log('error', error)
                dispatch({
                    type: FORGOT_PASSWORD_ERROR,
                    payload: error,
                });
            });
    }
}

export function resetPassword({ password, token }) {
    return (dispatch) => {
        fetch(`${API_ADDRESS}/password-reset/reset`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ password, token }),
        })
            .then(checkResponse)
            .then(data => {
                console.log('data', data);
                dispatch({
                    type: RESET_PASSWORD,
                });
            })
            .catch((error) => {
                console.log('error', error)
                dispatch({
                    type: RESET_PASSWORD_ERROR,
                    payload: error,
                });
            });
    }
}

export function logoutUser() { 
    return (dispatch) => {
        fetch(`${API_AUTH}/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ token: getCookie('refreshToken') }),
        })
            .then(checkResponse)
            .then(data => {
                console.log('data', data);
                dispatch({
                    type: LOGOUT_SUCCESS,
                    name: '',
                    email: '',
                });
                setCookie('accessToken', '');
                setCookie('refreshToken', '');
            })
            .catch((error) => {
                console.log('error', error);
                dispatch({
                    type: LOGOUT_ERROR,
                    payload: error,
                })
            });
    }
}

export function token() { 
    return (dispatch) => {
        fetch(`${API_AUTH}/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({token: getCookie('refreshToken')}),
        })
            .then(checkResponse)
            .then(data => {
                setCookie('accessToken', data.accessToken);
                setCookie('refreshToken', data.refreshToken);
                dispatch({
                    type: TOKEN_SUCCESS,
                });
            }).then(() => {
                dispatch(checkUser());
            })
            .catch((error) => {
                console.log('Пользователь не авторизован', error);
                dispatch({
                    type: TOKEN_ERROR,
                    payload: error,
                })
            });
    }
}

export function checkUser() { 
    return (dispatch) => {
        fetch(`${API_AUTH}/user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': getCookie('accessToken'),
            }
        })
            .then(response => {
                if (response.status === 403) {
                    throw dispatch(token());
                } else { 
                    return checkResponse(response); 
                }
            })
            .then(data => {
                console.log(data);
                dispatch({
                    type: USER_SUCCESS,
                    payload: data.user,
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: USER_ERROR,
                });
            });
    }
}
