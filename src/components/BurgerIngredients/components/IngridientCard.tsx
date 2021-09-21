import React from 'react';
import PropTypes from 'prop-types';
import ingridientCardStyles from './IngridientCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngridientCard({data, select}) {
  const { price, image, name } = data;

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

IngridientCard.propTypes = {
  data: PropTypes.shape({
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    name: PropTypes.string,
    image_large: PropTypes.string,
  }).isRequired,
  select: PropTypes.string,
};

export default IngridientCard;
