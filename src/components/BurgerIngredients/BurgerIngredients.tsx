import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientCard from './components/IngridientCard';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('bun');
  const buns = props.productData.filter(item => item.type === 'bun');
  const sauces = props.productData.filter(item => item.type === 'sauce');
  const mains = props.productData.filter(item => item.type === 'main');

  return (
    <div className={burgerIngredientsStyles.burgerIngredients}>
      <p className="text text_type_main-large">Соберите бургер</p>
      <div className={burgerIngredientsStyles.tab}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
      </div>

      <div className={burgerIngredientsStyles.customScroll}>
        <p className="text text_type_main-medium">Булки</p>
        <div className={burgerIngredientsStyles.cards}>
          {buns.map(item => (
            <IngridientCard data={item} select="1" key={item._id}/>)
          )}
        </div>

        <p className="text text_type_main-medium">Соусы</p>
        <div className={burgerIngredientsStyles.cards}>
          {sauces.map(item => (
            <IngridientCard data={item} select="0" key={item._id}/>)
          )}
        </div>

        <p className="text text_type_main-medium">Начинки</p>
        <div className={burgerIngredientsStyles.cards}>
          {mains.map(item => (
            <IngridientCard data={item} select="0" key={item._id}/>)
          )}
        </div>
      </div>

    </div>
  );
}

BurgerIngredients.propTypes = {
  productData: PropTypes.array
};

export default BurgerIngredients;
