import React from 'react';
import { Link} from 'react-router-dom';

import styles from './error-page.module.css';

const ErrorPage: React.FC = () => {
    return (
        <form className={styles.errorForm}>
            <span className="text_type_main-medium">К сожалению такой страницы нет</span>
            <div className={styles.image}/>
            <Link
                to={{ pathname: "/" }}
                className={styles.link}
            >
                Вернуться на главную
            </Link>
        </form>
      );
}

export default ErrorPage;
