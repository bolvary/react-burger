import React from 'react';
import { NavLink, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProfileDetails from '../../components/ProfileDetails/ProfileDetails';
import OrdersList from '../../components/OrderList/OrderList';

import { isLoginUser } from '../../services/Auth/selectors';
import { logoutUser } from '../../services/Auth/actions';

import styles from './profile.module.css';

const ProfilePage: React.FC = () => {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();
    const getIsLoginUser = useSelector(isLoginUser);

    const onClickLogout = () => {
        dispatch(logoutUser());
    }

    if (!getIsLoginUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.left}>
                <nav className={`${styles.nav} mr-15 mt-20`}>
                    <NavLink 
                        exact
                        to={path} 
                        className={`${styles.text} text text_type_main-medium text_color_inactive`}
                        activeStyle={{color: "#fff"}}
                    >
                        Профиль
                    </NavLink>
                    <NavLink 
                        to={`${path}/orders`}
                        className={`${styles.text} text text_type_main-medium text_color_inactive`}
                        activeStyle={{color: "#fff"}}
                    >
                        История заказов
                    </NavLink>
                    <div 
                        className={`${styles.link}`}
                        onClick={(() => onClickLogout())}
                    >
                        <p className={`${styles.text}text text_type_main-medium text_color_inactive`}>
                            Выход
                        </p>
                    </div>
                </nav>
                <p className={`${styles.description} text text_type_main-default text_color_inactive`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div className={styles.right}>
            <Switch>
                <Route path={path} exact={true}>
                <ProfileDetails />
                </Route>
                <Route path={`${path}/orders`} exact={true}>
                <OrdersList />
                </Route>
            </Switch>
            </div>
        </div>
        );
}

export default ProfilePage;
