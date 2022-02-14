import React, { useEffect} from 'react';
import { useDispatch, useSelector } from '../../hooks/hooks';

import { WS_CONNECTION_START_USER, WS_CONNECTION_CLOSED } from '../../services/Websocket/actions';
import { TOrderCard } from '../../utils/types';
import Order from './components/OrderInfo/Order';

import styles from './OrderList.module.css';

const OrdersList: React.FC = () => {
    const dispatch = useDispatch();
    const ordersInfo = useSelector(store => store.websocket.ordersInfo);

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START_USER });
        return () => {
          dispatch({ type: WS_CONNECTION_CLOSED });
        }
      },[dispatch]);

    return (
        <div>
            { ordersInfo.orders ?
                <div className={`${styles.orderList} ${styles.customScroll}`}>
                    <ul className={`${styles.cards} mr-2`}>
                        {ordersInfo.orders && ordersInfo.orders.map((item: TOrderCard, index: number) => {
                            return <Order key={index} orderInfo={item}/>
                        })}
                    </ul>
                </div> :
                <span className="text_type_main-small">...Тут пока пусто...</span>
            }
        </div>
      );
}

export default OrdersList;
