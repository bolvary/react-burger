import React, { useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Redirect, useLocation } from 'react-router-dom';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch, useSelector } from '../../hooks/hooks';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import SelectIngredient from './components/SelectIngredient';
import { REMOVE_ORDER_ID, getOrder } from '../../services/Order/actions';
import { addBuns, addIngredients } from '../../services/ContructorIngridients/actions';
import { CHANGE_INGREDIENTS } from '../../services/ContructorIngridients/actions';
import { isLoginUser } from '../../services/Auth/selectors';

import burgerConstructorStyles from './BurgerConstructor.module.css';
import { TIngridientData } from '../../utils/types';

const BurgerConstructor: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { selectedIngredients, buns } = useSelector((state) => state['selectedIngredients']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userLogin =  useSelector(isLoginUser);
  const [redirect, setRedirect] = useState(false);

  const isBunAdded = useMemo(() => {
    return !(buns === undefined || buns === null);
  }, [buns]);

  const [, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item: { data: TIngridientData }) {
        item.data.type === 'bun' ?
        dispatch(addBuns(item.data)) : 
        dispatch(addIngredients(item.data));
    },
  });

  const handleClickOrderButton = () => {
    if (!userLogin) {
      setRedirect(true);
      return;
    }

    if (!isBunAdded) return;
    const selectedIds = [...selectedIngredients.map((item: TIngridientData) => item._id)];
    const bunId = buns?._id;
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
    const ingSum = selectedIngredients ? selectedIngredients.reduce((total: number, current: TIngridientData) => {
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

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
    );
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
              text={`${buns.name} (????????)`}
              price={buns.price}
              thumbnail={`${buns.image_mobile}`}
            />
          </div>
       :           
        <div className={`${burgerConstructorStyles.emptyConstructor} text text_type_main-medium`}>
          ???????????????????? ???????? ??????????!
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
          ???????????????????? ???????? ??????????????????????!
        </div>
      }

      { buns &&
          <div className={`${burgerConstructorStyles.fixedPosition} buns`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${buns.name} (??????)`}
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
        <Button type="primary" size="medium" onClick={()=>handleClickOrderButton()}>???????????????? ??????????</Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
