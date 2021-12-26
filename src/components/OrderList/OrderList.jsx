import React from 'react';

import styles from './OrderList.module.css';

export function OrdersList() {

    return (
        <form className={styles.orderListForm}>
            <span className="text_type_main-small">...Ведутся работы - зайдите позже...</span>
        </form>
      );
}
