import React from 'react';
import appHeaderStyles from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {

  return (
    <div className={appHeaderStyles.appHeader}>
      <nav className={appHeaderStyles.mainMenu}>
        <a href="#" className={appHeaderStyles.headerLink + ' ' + appHeaderStyles.activeLink}>
          <BurgerIcon type="primary"/>
          <p className="text text_type_main-default">Конструктор</p>
        </a> 
        <a href="#" className={appHeaderStyles.headerLink}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default">Лента заказов</p>
        </a> 
      </nav>
      <Logo />
      <div className={appHeaderStyles.loginMenu}>
        <a href="#" className={appHeaderStyles.headerLink}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default">Личный кабинет</p>
        </a> 
      </div>
    </div>
  );
}

export default AppHeader;
