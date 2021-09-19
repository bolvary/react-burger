import React from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { selectData } from './../../utils/selectData';
import { DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import { FAKE_ORDER_ID } from '../../constants';
import OrderDetails from '../OrderDetails/OrderDetails';

const BurgerConstructor = () => {
  const buns = selectData.filter(item => item.type === 'bun');
  const otherIngridients = selectData.filter(item => item.type !== 'bun');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClickOrderButton = () => {
    setIsModalOpen(true);
  }

  const onClose = () => {
    setIsModalOpen(false);
  }

  return (
    <div className={burgerConstructorStyles.burgerConstructor}>
      {isModalOpen && 
        <Modal onClose={onClose}>
          <OrderDetails orderId={FAKE_ORDER_ID}/>
        </Modal>
      }
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
          <Button type="primary" size="medium" onClick={()=>handleClickOrderButton()}>Оформить заказ</Button>
        </div>
    </div>
  );
}

export default BurgerConstructor;
