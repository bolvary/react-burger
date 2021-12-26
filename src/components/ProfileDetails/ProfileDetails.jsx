import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
  } from '@ya.praktikum/react-developer-burger-ui-components';

import { getUserName, getUserEmail } from '../../services/Auth/selectors';
import { updateUserData } from '../../services/Auth/actions';

import styles from './ProfileDetails.module.css';

export function ProfileDetails() {
    const dispatch = useDispatch();
    const name = useSelector(getUserName);
    const email = useSelector(getUserEmail);

    const baseUser = {
        name: name,
        email: email,
        password: '',
    }

    const [formValue, setFormValue] = useState({
        name: name,
        email: email,
        password: '',
      });
  
    const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserData(formValue));
        setFormValue({ ...formValue, password: '' });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setFormValue({ ...baseUser });
      };

    return (
        <form className={`${styles.profileDetailsForm} mt-20`} onSubmit={handleSubmit}>
            <Input
                name="name"
                type="text"
                onChange={onChange}
                value={formValue.name}
                placeholder={"Имя"}
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

            <div className={styles.buttons}>
                <span className={styles.link} onClick={handleCancel}>
                    Отменить
                </span>
                <div className={styles.button}>
                    <Button type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
            </div>
        </form>
    );
}
