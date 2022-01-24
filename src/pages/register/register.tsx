import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { register } from '../../services/Auth/actions';
import { isLoginUser } from '../../services/Auth/selectors';

import styles from './register.module.css';

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();
    const userLogin =  useSelector(isLoginUser);

    const [formValue, setFormValue] = useState<{
      name: string,
      email: string,
      password: string
    }>({
      name: "",
      email: "",
      password: "",
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(register(formValue));
    };

    if (userLogin) {
      return <Redirect to="/" />;
    }

    return (
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <span className="text_type_main-medium">Регистрация</span>
          <Input
            name="name"
            type="text"
            placeholder={"Имя"}
            onChange={onChange}
            value={formValue.name}
          />
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
          <Button>Зарегистрироваться</Button>
          <div className="mt-9">
            <span className="text_type_main-default text_color_inactive mr-2">
              Уже зарегистрированы?
            </span>
            <Link to={"/login"} className={styles.link}>
              Войти
            </Link>
          </div>
        </form>
      );
}

export default RegisterPage;
