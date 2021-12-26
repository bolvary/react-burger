
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { isEmailSent } from '../../services/Auth/selectors';
import { forgotPassword } from '../../services/Auth/actions';

import styles from './forgot-password.module.css';

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const checkIsEmailSent = useSelector(isEmailSent);

  const [formValue, setFormValue] = useState({
    email: '',
  });

  if (checkIsEmailSent) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password',
        }}
      />
    );
  }

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(formValue));
  };

  return (
    <form className={styles.forgotPasswordForm} onSubmit={handleSubmit}>
        <span className="text_type_main-medium">Восстановление пароля</span>
        <EmailInput 
          name="email"
          value={formValue.email}
          placeholder={'Укажите e-mail'}
          onChange={onChange}
        />
        <Button>Восстановить</Button>
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
