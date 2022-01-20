import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { isLoginUser, getUserName } from '../../services/Auth/selectors';

import appHeaderStyles from './AppHeader.module.css';

const AppHeader: React.FC = () => {
  const isAuthUser = useSelector(isLoginUser);
  const userName = useSelector(getUserName);

  const profileActive = !!useRouteMatch({ path: '/profile' });
  const constructorActive = !!useRouteMatch({ path: '/', exact: true });
  const burgerType = constructorActive ? 'primary' : 'secondary';
  const profileIconType = profileActive ? 'primary' : 'secondary';

  return (
    <div className={appHeaderStyles.appHeader}>
      <nav className={appHeaderStyles.mainMenu}>
        <a href="/" className={`${appHeaderStyles.headerLink} ${constructorActive && appHeaderStyles.activeLink}`}>
          <BurgerIcon type={burgerType}/>
          <p className="text text_type_main-default">Конструктор</p>
        </a> 
        <a href="#" className={appHeaderStyles.headerLink}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default">Лента заказов</p>
        </a> 
      </nav>
      <Link to='/'>    
          <Logo />
      </Link>
      <div className={appHeaderStyles.loginMenu}>
        {isAuthUser ? 
          <Link to="/profile" className={`${appHeaderStyles.headerLink} ${profileActive && appHeaderStyles.activeLink}`}>
            <ProfileIcon type={profileIconType} />
            <p className="text text_type_main-default">{userName}</p>
          </Link> :
          <Link to="/login" className={appHeaderStyles.headerLink}>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default">Войти</p>
          </Link> 
        }
      </div>
    </div>
  );
}

export default AppHeader;
