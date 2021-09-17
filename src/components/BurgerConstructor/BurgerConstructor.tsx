import React from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { selectData } from './../../utils/selectData';
import { DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerConstructor(props) {
  const buns = selectData.filter(item => item.type === 'bun');
  const otherIngridients = selectData.filter(item => item.type !== 'bun');

  return (
    <div className={burgerConstructorStyles.burgerConstructor}>
      <div className={burgerConstructorStyles.fixedPosition}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${buns[0].name} (верх)`}
          price={buns[0].price}
          thumbnail={`${buns[0].image_mobile}`}
        />
      </div>
      <div className={burgerConstructorStyles.customScroll}>
        {otherIngridients.map((item, index) => (
          <div className={burgerConstructorStyles.ingridient} key={index}>
            <DragIcon type="primary" />
            <ConstructorElement 
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          </div>
          )
      )}
      </div>
      <div className={burgerConstructorStyles.fixedPosition}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${buns[0].name} (низ)`}
          price={buns[0].price}
          thumbnail={`${buns[0].image_mobile}`}
        />
      </div>
        <div className={burgerConstructorStyles.orderFooter}>
          <div className={burgerConstructorStyles.orderResult}>
            <p className="text text_type_digits-medium">610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="medium">Оформить заказ</Button>
        </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  productData: PropTypes.array
};

export default BurgerConstructor;
