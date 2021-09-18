import React from 'react';
import ingridientCardStyles from './IngridientCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngridientCard(props) {
  const { price, image, name } = props.data;
  const select = props.select;

  return (
    <div className={ingridientCardStyles.ingridientCard}>
      <div className={ingridientCardStyles.counterOuter}>
        {select!=="0" && <div className={`${ingridientCardStyles.counter} text text_type_digits-default`}>{select}</div>}
      </div>
      <img src={image} />
      <div className={ingridientCardStyles.price}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small">{name}</p>
    </div>
  );
}

export default IngridientCard;
