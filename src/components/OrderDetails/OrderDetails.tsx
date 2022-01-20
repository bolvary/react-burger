import React from 'react';
import { useSelector } from 'react-redux';

import orderDetailsStyles from './OrderDetails.module.css';

const OrderDetails: React.FC = () => { 
    const orderId = useSelector((state) => state['order'].orderId);

    return(
        <div className={orderDetailsStyles.orderDetails}>
            <p className={`${orderDetailsStyles.orderNumber} text text_type_digits-large`}>{orderId}</p>
            <p className='text text_type_main-medium'>идентификатор заказа</p>
            <div className={orderDetailsStyles.image}/>
            <p className={`${orderDetailsStyles.success} text text_type_main-default`}>Ваш заказ начали готовить</p>
            <p className={`${orderDetailsStyles.text} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;
