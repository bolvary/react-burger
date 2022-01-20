import React from "react";
import styles from "./orders-page.module.css";
import { Link } from "react-router-dom";

const OrdersPage: React.FC = () => {

    return (
        <form className={styles.ordersForm}>
            <span className="text_type_main-medium">Ведутся работы - зайдите позже</span>
            <Link
                to={{ pathname: "/" }}
                className={styles.link}
            >
                Вернуться на главную
            </Link>
        </form>
      );
}

export default OrdersPage;
