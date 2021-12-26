import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';

import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { loginUser } from '../../services/Auth/actions';
import { isLoginUser } from '../../services/Auth/selectors';

import styles from './login.module.css';

export function LoginPage() {
  const dispatch = useDispatch();
  const userLogin =  useSelector(isLoginUser);
  const location = useLocation();

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formValue));
  };

  if (userLogin) {
    return <Redirect to={ location.state?.from || '/' } />;
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className="text_type_main-medium">Вход</span>
      <EmailInput 
        name="email" 
        onChange={onChange} 
        value={formValue.email}
      />
      <PasswordInput
        name="password"
        onChange={onChange}
        value={formValue.password}
      />
      <Button>Войти</Button>
      <div className="mt-9">
        <span className="text_type_main-default text_color_inactive mr-2">
          Вы - новый пользователь?
        </span>

        <Link
          to={{
            pathname: "/register",
          }}
          className={styles.link}
        >
          Зарегистрироваться
        </Link>
      </div>
      <div>
        <span className="text_type_main-default text_color_inactive mr-2">
          Забыли пароль?
        </span>
        <Link
          to={{
            pathname: "/forgot-password",
          }}
          className={styles.link}
        >
          Восстановить пароль
        </Link>
      </div>
    </form>
  );
}
