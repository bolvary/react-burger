import React from 'react';

import styles from './OrderList.module.css';

const OrdersList: React.FC = () => {
    return (
        <form className={styles.orderListForm}>
            <span className="text_type_main-small">...Ведутся работы - зайдите позже...</span>
        </form>
      );
}

export default OrdersList;
