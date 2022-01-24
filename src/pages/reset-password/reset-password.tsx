
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { isPasswordReseted, isLoginUser, isResetPasswordInProgress } from '../../services/Auth/selectors';
import { resetPassword } from '../../services/Auth/actions';

import styles from './reset-password.module.css';

const ResetPasswordPage: React.FC = () => {
  const dispatch = useDispatch();
  const checkIsPasswordReseted = useSelector(isPasswordReseted);
  const userLogin = useSelector(isLoginUser);
  const resetPasswordInProgress = useSelector(isResetPasswordInProgress);

  const [formValue, setFormValue] = useState<{ password: string, token: string }>({
    password: '',
    token: '',
  });

  if (checkIsPasswordReseted) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }
  if (userLogin || !resetPasswordInProgress) {
    return <Redirect to="/" />;
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword(formValue));
  };

  return (
    <form className={styles.resetPasswordForm} onSubmit={handleSubmit}>
        <span className="text_type_main-medium">Восстановление пароля</span>
        <PasswordInput
          name="password"
          value={formValue.password}
          onChange={onChange}
        />
        <Input
          name="token"
          value={formValue.token}
          type="text"
          placeholder="Введите код из письма"
          onChange={onChange}
        />
        <Button>Сохранить</Button>
        <div className="mt-9">
            <span className="text_type_main-default text_color_inactive mr-2">
                Вспомнили пароль?
            </span>
            <Link
                to={{
                  pathname: '/login',
                }}
                className={styles.link}
            >
                Войти
            </Link>
        </div>
  </form>
  );
}

export default ResetPasswordPage;
