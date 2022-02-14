import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch } from '../../hooks/hooks';

import OrderList from '../../components/OrderList/OrderList';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/Websocket/actions';
import OrdersStatistic from '../../components/OrdersStatistic/OrdersStatistic';
import OrderDetails from '../../components/OrderList/components/OrderDetails/OrderDetails';

import styles from './feed-page.module.css';

const FeedPage: React.FC = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    }
  }, [dispatch]);

  return (
    <div className={`${styles.container} mt-10`}>
      <div className={styles.box}>
        <p className="text text_type_main-large mb-5">
          Лента заказов
        </p>
        <OrderList />
      </div>
        <OrdersStatistic />
        <>
        <Switch>
          <Route path={`${path}/:id`} exact={true}>
              <OrderDetails />
          </Route>
        </Switch>
        </>
    </div>
  );
}

export default FeedPage;
