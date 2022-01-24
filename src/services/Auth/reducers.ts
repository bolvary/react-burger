import {
    SET_USER_DATA,
    UPDATE_USER_DATA,
    UPDATE_USER_DATA_ERROR,
    
    REGISTER_ERROR,
    REGISTER_SENDING,

    LOGIN_USER_ERROR,
    LOGIN_USER,

    FORGOT_PASSWORD_ERROR,
    FORGOT_PASSWORD,

    RESET_PASSWORD_ERROR,
    RESET_PASSWORD,
    
    LOGOUT_ERROR,
    LOGOUT_SUCCESS,

    TOKEN_ERROR,
    TOKEN_SUCCESS,

    USER_ERROR,
    USER_SUCCESS,

} from './actions';

type TAuth = {
    loginUser: boolean,
    loginError: boolean,
    registerSending: boolean,
    registerError: boolean,
    updateUserDataError: boolean,
    name: string,
    email: string,
    errorMessage: string,
    emailSent: boolean,
    passwordReseted: boolean,
    resetPasswordInProgress: boolean,
}

const initialStateProfile: TAuth = {
    loginUser: false,
    loginError: false,
    registerSending: false,
    registerError: false,
    updateUserDataError: false,
    name: '',
    email: '',
    errorMessage: '',
    emailSent: false,
    passwordReseted: false,
    resetPasswordInProgress: false,
};
  
export const auth = (state = initialStateProfile, action) => {

    switch (action.type) {

        case TOKEN_SUCCESS: {
            return {
                ...state,
            }
        }

        case TOKEN_ERROR: {
            return {
                ...state,
                errorMessage: action.payload.error,
            }
        }

        case USER_SUCCESS: {
            return {
                loginUser: true,
                name: action.payload.name,
                email: action.payload.email,
            }
        }

        case USER_ERROR: {
            return {
                ...state,
            }
        }

        case REGISTER_SENDING: {
            return {
                ...state,
                registerSending: true,
                errorMessage: '',
            }
        }

        case SET_USER_DATA: {
            return {
                ...state,
                registerError: false,
                registerSending: false,
                loginUser: true,
                name: action.payload.name,
                email: action.payload.email,
                errorMessage: '',
            }
        }

        case UPDATE_USER_DATA: {
            return {
                ...state,
                updateUserDataError: false,
                name: action.payload.name,
                email: action.payload.email,
                errorMessage: '',
            }
        }

        case UPDATE_USER_DATA_ERROR: {
            return {
                ...state,
                updateUserDataError: true,
                errorMessage: action.payload.error,
            }
        }

        case REGISTER_ERROR: {
            return {
                ...state,
                registerError: true,
                registerSending: false,
                errorMessage: action.payload.error,
            }
        }
        case LOGIN_USER: {
            return {
                ...state,
                loginUser: true,
                loginError: false,
                name: action.payload.name,
                email: action.payload.email,
                errorMessage: '',
            }

        }

        case LOGIN_USER_ERROR: {
            return {
                ...state,
                loginUser: false,
                loginError: true,
                errorMessage: action.payload.error,
            }
        }

        case FORGOT_PASSWORD: {
            return {
                ...state,
                emailSent: true,
                errorMessage: '',
                resetPasswordInProgress: true,
            }
        }

        case FORGOT_PASSWORD_ERROR: {
            return {
                ...state,
                errorMessage: action.payload.error,
                resetPasswordInProgress: false,
            }
        }

        case RESET_PASSWORD: {
            return {
                ...state,
                passwordReseted: true,
                resetPasswordInProgress: true,
                errorMessage: '',
            }
        }

        case RESET_PASSWORD_ERROR: {
            return {
                ...state,
                passwordReseted: false,
                resetPasswordInProgress: false,
                errorMessage: action.payload.error,
            }
        }

        case LOGOUT_SUCCESS: {
            return {
                ...state,
                loginUser: false,
                name: '',
                email: '',
                errorMessage: '',
            }
        }

        case LOGOUT_ERROR: {
            return {
                ...state,
                errorMessage: action.payload.error,
            }
        }

        default: {
            return state;
        }
    }
};
