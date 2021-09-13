import React from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { selectData } from './../../utils/selectData';
import { DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor(props) {
  const buns = selectData.filter(item => item.type === 'bun');
  const otherIngridients = selectData.filter(item => item.type !== 'bun');

  return (
    <div className={burgerConstructorStyles.burgerConstructor}>
        <div className={burgerConstructorStyles.customScroll}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${buns[0].name} (верх)`}
            price={buns[0].price}
            thumbnail={`${buns[0].image_mobile}`}
          />
          {otherIngridients.map(item => (
            <div className={burgerConstructorStyles.ingridient} key={item._id}>
              <DragIcon type="primary" />
              <ConstructorElement 
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
              />
            </div>
            )
          )}
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

export default BurgerConstructor;
