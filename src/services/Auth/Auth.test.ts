import { auth } from  './reducers';
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
} from './actions';

const initialStateProfile = {
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

const userDataWithoutPass = {
    name: 'TEST_NAME',
    email: 'TEST_EMAIL',
}

const testError = { error: 'ERROR' };


describe('Проверка авторизации', () => {

    it("Проверка начальных данных", () => {
        // @ts-ignores
        expect(auth(undefined, {})).toEqual(initialStateProfile)
    })

    it("Проверка установки пользовательских данных", () => {
        expect(
            auth(initialStateProfile,
                {
                    type: SET_USER_DATA,
                    payload: userDataWithoutPass,
                }
        )
        ).toEqual(
            {
                ...initialStateProfile,
                loginUser: true,
                name: userDataWithoutPass.name,
                email: userDataWithoutPass.email,
            }
        );
    });

    it("Проверка обновления пользовательских данных", () => {
        expect(
            auth(
                {
                    ...initialStateProfile,
                    name: 'TEST_NAME_0',
                    email: 'TEST_EMAIL_0'
                },
                {
                    type: UPDATE_USER_DATA,
                    payload: userDataWithoutPass,
                }
        )
        ).toEqual(
            {
                ...initialStateProfile,
                name: userDataWithoutPass.name,
                email: userDataWithoutPass.email,
            }
        );
    });

    it("Проверка ошибки при обновлении пользовательских данных", () => {
        expect(
            auth(
                {
                    ...initialStateProfile,
                },
                {
                    type: UPDATE_USER_DATA_ERROR,
                    payload: testError
                }
        )
        ).toEqual(
            {
                ...initialStateProfile,
                updateUserDataError: true,
                errorMessage: testError.error,
            }
        );
    });

    it("Проверка регистрации пользовательских данных", () => {
        expect(
            auth(
                {
                    ...initialStateProfile,
                },
                {
                    type: REGISTER_SENDING,
                }
        )
        ).toEqual(
            {
                ...initialStateProfile,
                registerSending: true,
            }
        );
    });

    it("Проверка ошибки при регистрации пользовательских данных", () => {
        expect(
            auth(
                {
                    ...initialStateProfile,
                },
                {
                    type: REGISTER_ERROR,
                    payload: testError,
                }
        )
        ).toEqual(
            {
                ...initialStateProfile,
                registerError: true,
                errorMessage: testError.error,           
            }
        );
    });

    it("Проверка успешкого залогина", () => {
        expect(
            auth(
                {
                    ...initialStateProfile,
                },
                {
                    type: LOGIN_USER,
                    payload: userDataWithoutPass,
                }
        )
        ).toEqual(
            {
                ...initialStateProfile,
                loginUser: true,
                name: userDataWithoutPass.name,
                email: userDataWithoutPass.email,       
            }
        );
    });

    it("Проверка ошибки залогина", () => {
        expect(
            auth(
                {
                    ...initialStateProfile,
                },
                {
                    type: LOGIN_USER_ERROR,
                    payload: testError,
                }
        )
        ).toEqual(
            {
                ...initialStateProfile,
                loginError: true,
                errorMessage: testError.error,      
            }
        );
    });

    it("Проверка успешной отправки письма при забытом пароле", () => {
        expect(
            auth(
                {
                    ...initialStateProfile,
                },
                {
                    type: FORGOT_PASSWORD,
                }
        )
        ).toEqual(
            {
                ...initialStateProfile,
                emailSent: true,
                resetPasswordInProgress: true,
            }
        );
    });

    it("Проверка ошибки при отправке письма при забытом пароле", () => {
        expect(
            auth(
                {
                    ...initialStateProfile,
                },
                {
                    type: FORGOT_PASSWORD_ERROR,
                    payload: testError,
                }
        )
        ).toEqual(
            {
                ...initialStateProfile,
                errorMessage: testError.error,      
            }
        );
    });

    it("Проверка сброса пароля", () => {
        expect(
            auth(
                {
                    ...initialStateProfile,
                },
                {
                    type: RESET_PASSWORD,
                }
        )
        ).toEqual(
            {
                ...initialStateProfile,
                passwordReseted: true,
                resetPasswordInProgress: true,
            }
        );
    });

    it("Проверка ошибки при сбросе пароля", () => {
        expect(
            auth(
                {
                    ...initialStateProfile,
                },
                {
                    type: RESET_PASSWORD_ERROR,
                    payload: testError,
                }
        )
        ).toEqual(
            {
                ...initialStateProfile,
                errorMessage: testError.error,      
            }
        );
    });

    it("Проверка успешного выхода", () => {
        expect(
            auth(
                {
                    ...initialStateProfile,
                    name: userDataWithoutPass.name,
                    email: userDataWithoutPass.email,
                },
                {
                    type: LOGOUT_SUCCESS,
                    name: userDataWithoutPass.name,
                    email: userDataWithoutPass.email,
                }
        )
        ).toEqual(
            {
                ...initialStateProfile,
            }
        );
    });

    it("Проверка ошибки при выходе", () => {
        expect(
            auth(
                {
                    ...initialStateProfile,
                    name: userDataWithoutPass.name,
                    email: userDataWithoutPass.email,
                },
                {
                    type: LOGOUT_ERROR,
                    payload: testError,
                }
        )
        ).toEqual(
            {
                ...initialStateProfile,
                name: userDataWithoutPass.name,
                email: userDataWithoutPass.email,
                errorMessage: testError.error,      
            }
        );
    });

    it("Проверка успешного токена", () => {
        expect(
            auth(
                {
                    ...initialStateProfile,
                    name: userDataWithoutPass.name,
                    email: userDataWithoutPass.email,
                },
                {
                    type: TOKEN_SUCCESS,
                }
        )
        ).toEqual(
            {
                ...initialStateProfile,
                name: userDataWithoutPass.name,
                email: userDataWithoutPass.email,
            }
        );
    });

    it("Проверка ошибки токена", () => {
        expect(
            auth(
                {
                    ...initialStateProfile,
                    name: userDataWithoutPass.name,
                    email: userDataWithoutPass.email,
                },
                {
                    type: TOKEN_ERROR,
                    payload: testError,
                }
        )
        ).toEqual(
            {
                ...initialStateProfile,
                name: userDataWithoutPass.name,
                email: userDataWithoutPass.email,
                errorMessage: testError.error,      
            }
        );
    });


    
});
