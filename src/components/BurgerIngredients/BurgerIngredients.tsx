import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientCard from './components/IngridientCard';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';

const  BurgerIngredients = ({productData}) => {
  const [current, setCurrent] = React.useState('bun');
  const buns = productData.filter(item => item.type === 'bun');
  const sauces = productData.filter(item => item.type === 'sauce');
  const mains = productData.filter(item => item.type === 'main');

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedIngridients, setSelectedIngridients] = React.useState({});

  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleClickIngredients = (item) => {
    setIsModalOpen(true);
    setSelectedIngridients(item);
  }

  const onClose = () => {
    setIsModalOpen(false);
  }

  return (
    <div className={burgerIngredientsStyles.burgerIngredients}>
      {isModalOpen && 
        <Modal onClose={onClose} title="Детали ингредиента">
          <IngredientDetails data={selectedIngridients}/>
        </Modal>
      }
      <p className="text text_type_main-large">Соберите бургер</p>
      <div className={burgerIngredientsStyles.tab}>
        <Tab value="bun" active={current === 'bun'} onClick={setTab}>Булки</Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setTab}>Соусы</Tab>
        <Tab value="main" active={current === 'main'} onClick={setTab}>Начинки</Tab>
      </div>

      <div className={burgerIngredientsStyles.customScroll}>
        <p className="text text_type_main-medium" id="bun">Булки</p>
        <div className={burgerIngredientsStyles.cards}>
          {buns.map(item => (
            <div key={item._id} onClick={()=>handleClickIngredients(item)}>
              <IngridientCard data={item} select="1" />
            </div>)
          )}
        </div>

        <p className="text text_type_main-medium" id="sauce">Соусы</p>
        <div className={burgerIngredientsStyles.cards}>
          {sauces.map(item => (
            <div key={item._id} onClick={()=>handleClickIngredients(item)}>
              <IngridientCard data={item} select="0" key={item._id}/>
            </div>)
          )}
        </div>

        <p className="text text_type_main-medium" id="main">Начинки</p>
        <div className={burgerIngredientsStyles.cards}>
          {mains.map(item => (
            <div key={item._id} onClick={()=>handleClickIngredients(item)}>
              <IngridientCard data={item} select="0" key={item._id}/>
            </div>)
          )}
        </div>
      </div>

    </div>
  );
}

const productData = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  name: PropTypes.string,
  image: PropTypes.string,
  image_large: PropTypes.string,
});

BurgerIngredients.propTypes = {
  productData: PropTypes.arrayOf(productData.isRequired).isRequired,
};

export default BurgerIngredients;
