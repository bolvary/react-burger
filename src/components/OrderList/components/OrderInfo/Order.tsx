import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import {  useSelector } from 'react-redux';

import { getAllIngredients } from '../../../../services/AllIngridients/selectors';
import { TIngridientData, TLocation, TOrder } from '../../../../utils/types';

import styles from './Order.module.css';

const Order: React.FC<TOrder> = ({ orderInfo }) => {
  const location = useLocation<TLocation>();
  const url = location.pathname.includes('/profile/orders') ? '/profile/orders' : '/feed';
  const ingredients = useSelector(getAllIngredients);

  const orderIngs = 
    orderInfo.ingredients && orderInfo.ingredients.reduce(
      (acc: Array<TIngridientData | undefined>, orderId: string) => {
        for(let i = 0; i < ingredients.length; i++) {
          if(ingredients[i]._id === orderId) {
            acc.push(ingredients[i])
          } 
        }
        return acc;
    }, []);

  const totalPrice = orderIngs.length && orderIngs.reduce((acc: number, item: TIngridientData | undefined) => item && item.price ? acc + item.price : acc, 0);
  const status = orderInfo.status === 'done' ? 'Выполнен' : 'Готовится';

  const date = new Date(orderInfo.createdAt)
    .toLocaleString("ru", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short"
    })

  return (
    <Link 
      to={{
        pathname: `${url}/${orderInfo._id}`,
        state: { modal: true }
      }}
      className={styles.card}
      key={orderInfo._id}
    >
      <li>
        <div className={styles.info}>
          <p className='text text_type_digits-default'>#{orderInfo.number}</p>
          <p className='text text_type_main-default text_color_inactive'>{date}</p>
        </div>
        <p className='text text_type_main-medium mt-6'>{orderInfo.name}</p>
        <p className={`text text_type_main-default mt-2 ${orderInfo.status !== 'done' && styles.status}`}>
          {status}
        </p>
        <div className={`${styles.order} mt-6`}>
          <ul className={styles.images}>
            {orderIngs && orderIngs.map((ingredient: TIngridientData | undefined, index: number) => {
              if (index < 6) { 
                return (
                <li key={index} style={{zIndex: orderIngs.length - index}} className={`${styles.radius} ${orderIngs.length > 6 && index === 5 && styles.blackout}`}>
                    <img className={`${styles.image}`} src={ingredient && ingredient.image} alt='Ингредиент' />
                    {orderIngs.length > 6 && index === 5 && 
                    <p className={`${styles.number} text text_type_digits-default`}>{`+${orderIngs.length - 6}`}</p>
                    }
                </li>
                )
              } else {
                return null;
              }
            })}
          </ul>
          <div className={styles.price}>
            <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default Order;
