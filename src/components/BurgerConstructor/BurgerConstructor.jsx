import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import SelectIngredient from './components/SelectIngredient';
import { REMOVE_ORDER_ID, getOrder } from '../../services/Order/actions';
import { ADD_BUNS, ADD_INGREDIENTS, CHANGE_INGREDIENTS } from '../../services/ContructorIngridients/actions';
import { useDrop } from "react-dnd";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const {selectedIngredients, buns} = useSelector((state) => state['selectedIngredients']);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isBunAdded = useMemo(() => {
    return !(buns === undefined || buns === null);
  }, [buns]);

  const [, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item) {
        item.data.type === 'bun' ?
        dispatch({
          type: ADD_BUNS,
          payload: item.data
        }) : 
        dispatch({
          type: ADD_INGREDIENTS,
          payload: item.data
        })
    },
  });

  const handleClickOrderButton = () => {
    if (!isBunAdded) return;
    const selectedIds = [...selectedIngredients.map((item) => item._id)];
    const bunId = buns._id || null;
    const allIdsForOrder = {
      ingredients: [...selectedIds, bunId],
    };

    dispatch(getOrder(allIdsForOrder));
    setIsModalOpen(true);
  };

  const onClose = () => {
    dispatch({
      type: REMOVE_ORDER_ID,
    });
    setIsModalOpen(false);
  }

  const totalPrice = useMemo(()=> {
    const ingSum = selectedIngredients ? selectedIngredients.reduce((total, current) => {
      return total + current.price;
    }, 0) : 0;
    const bunsSum = buns ? buns.price*2 : 0;
    return ingSum + bunsSum;
 }, [selectedIngredients, buns]);

 const moveIng = (dragIndex, hoverIndex) => {
    dispatch({
      type: CHANGE_INGREDIENTS,
      payload: {
        fromIndex: dragIndex,
        toIndex: hoverIndex
      }
    });
 }

  return (
    <div className={burgerConstructorStyles.burgerConstructor} ref={dropTarget}>
      {isModalOpen && 
        <Modal onClose={onClose}>
          <OrderDetails />
        </Modal>
      }
      { buns ? 
          <div className={`${burgerConstructorStyles.fixedPosition} buns`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${buns.name} (верх)`}
              price={buns.price}
              thumbnail={`${buns.image_mobile}`}
            />
          </div>
       :           
        <div className={`${burgerConstructorStyles.emptyConstructor} text text_type_main-medium`}>
          Перетащите сюда булки!
        </div>
      }

      { selectedIngredients.length !== 0 ?
          <div className={`${burgerConstructorStyles.customScroll} ingredients`}> 
              {
                selectedIngredients.map((item, index) => (
                <SelectIngredient data={item} key={item.uuid} index={index} moveIng={moveIng}/>
              )
          )}
          </div>
        :         
        <div className={`${burgerConstructorStyles.emptyConstructor} text text_type_main-medium`}>
          Перетащите сюда ингридиенты!
        </div>
      }

      { buns &&
          <div className={`${burgerConstructorStyles.fixedPosition} buns`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${buns.name} (низ)`}
              price={buns.price}
              thumbnail={`${buns.image_mobile}`}
            />
          </div>
      }

      <div className={burgerConstructorStyles.orderFooter}>
        <div className={burgerConstructorStyles.orderResult}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={()=>handleClickOrderButton()}>Оформить заказ</Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
