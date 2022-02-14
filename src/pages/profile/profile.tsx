import React from 'react';
import { NavLink, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/hooks';

import ProfileDetails from '../../components/ProfileDetails/ProfileDetails';
import OrdersList from '../../components/OrderList/OrderList';

import { isLoginUser } from '../../services/Auth/selectors';
import { logoutUser } from '../../services/Auth/actions';

import OrderDetails from '../../components/OrderList/components/OrderDetails/OrderDetails';
import styles from './profile.module.css';

const ProfilePage: React.FC = () => {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();
    const getIsLoginUser = useSelector(isLoginUser);
    const isOrderDetailsPage = window.location.href.match('orders/\\w+') === null;
    const isOrderPage =  window.location.href.includes('orders');

    const onClickLogout = () => {
        dispatch(logoutUser());
    }

    if (!getIsLoginUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div className={styles.profileContainer}>
            {isOrderDetailsPage && <div className={styles.left}>
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
                { isOrderPage ?
                    <p className={`${styles.description} text text_type_main-default text_color_inactive`}>
                        В этом разделе вы можете просмотреть свою историю заказов
                    </p> :
                    <p className={`${styles.description} text text_type_main-default text_color_inactive`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                }
            </div> }
            <div className={styles.right}>
            <Switch>
                <Route path={`${path}`} exact>
                    <ProfileDetails />
                </Route>
                <Route path={`${path}/orders`} exact>
                    <OrdersList />
                </Route>
                <Route path={`${path}/orders/:id`} exact>
                    <OrderDetails />
                </Route>
            </Switch>
            </div>
        </div>
        );
}

export default ProfilePage;
