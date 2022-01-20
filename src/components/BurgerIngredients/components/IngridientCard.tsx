import React, { useMemo, FC } from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngridientData } from '../../../utils/types';

import ingridientCardStyles from './IngridientCard.module.css';

type TIngridientCard = {
  data: TIngridientData;
};

const IngridientCard: FC<TIngridientCard> = ({ data }) => {
  const { price, image, name, _id } = data;
  const selectedIngredients = useSelector((state) => state['selectedIngredients'].selectedIngredients);
  const buns = useSelector((state) => state['selectedIngredients'].buns);

  const [, dragRef] = useDrag({
    type: 'ingredients',
    item: () => {
      return { data }
    },
  });

  const selectMass = useMemo(()=> {
    const allIngredients = buns ? [...selectedIngredients, buns] : selectedIngredients;
    return allIngredients.reduce((obj, item) => {
      if (!obj.hasOwnProperty(item._id)) {
        obj[item._id] = 0;
      }
      item.type === 'bun' ? obj[item._id]=2 : obj[item._id]++;
      return obj;
    }, {});
 }, [selectedIngredients, buns]);

  return (
    <div className={ingridientCardStyles.ingridientCard} ref={dragRef}>
      <div className={ingridientCardStyles.counterOuter}>
        {selectMass[_id] && <div className={`${ingridientCardStyles.counter} text text_type_digits-default`}>{selectMass[_id]}</div>}
      </div>
      <img alt='' src={image} />
      <div className={ingridientCardStyles.price}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small">{name}</p>
    </div>
  );
}

export default IngridientCard;
