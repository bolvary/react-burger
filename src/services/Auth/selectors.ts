import { STORE_NAME } from './actions';

export const getUserName = store => store[STORE_NAME].name;
export const getUserEmail = store => store[STORE_NAME].email;
export const isLoginUser = store => store[STORE_NAME].loginUser;

export const isEmailSent = store => store[STORE_NAME].emailSent;

export const responseError = store => store[STORE_NAME].errorMessage;

export const isPasswordReseted = store => store[STORE_NAME].passwordReseted;
export const isResetPasswordInProgress = store => store[STORE_NAME].resetPasswordInProgress;
