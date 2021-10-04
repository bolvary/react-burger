import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientCard from './components/IngridientCard';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { SET_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from '../../services/IngredientDetails/actions';

const  BurgerIngredients = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state['ingredients'].ingredients);

  const [current, setCurrent] = React.useState('bun');
  const buns = productData.filter(item => item.type === 'bun');
  const sauces = productData.filter(item => item.type === 'sauce');
  const mains = productData.filter(item => item.type === 'main');

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

const inViewOptions = {
        threshold: 0,
        trackVisibility: true,
        delay: 100
    };
    const [bunRef, inViewBun] = useInView(inViewOptions);
    const [mainRef, inViewMain] = useInView(inViewOptions);
    const [sauceRef, inViewSauce] = useInView(inViewOptions);

    useEffect(() => {
        if (inViewBun) {
          setCurrent('bun');
        }
        else if (inViewSauce) {
          setCurrent('sauce');
        }         else if (inViewMain) {
          setCurrent('main');
        }
       }, [inViewBun, inViewMain, inViewSauce]);

  const handleClickIngredients = (item) => {
    setIsModalOpen(true);
    dispatch({
      type: SET_INGREDIENT_DETAILS,
      payload: item,
    });
  }

  const onClose = () => {
    setIsModalOpen(false);
  }

  return (
    <div className={burgerIngredientsStyles.burgerIngredients}>
      {isModalOpen && 
        <Modal onClose={onClose} title="Детали ингредиента">
          <IngredientDetails />
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
        <div className={burgerIngredientsStyles.cards} ref={bunRef}>
          {buns.map(item => (
            <div key={item._id} onClick={()=>handleClickIngredients(item)}>
              <IngridientCard data={item} />
            </div>)
          )}
        </div>

        <p className="text text_type_main-medium" id="sauce">Соусы</p>
        <div className={burgerIngredientsStyles.cards} ref={sauceRef}>
          {sauces.map(item => (
            <div key={item._id} onClick={()=>handleClickIngredients(item)}>
              <IngridientCard data={item} key={item._id}/>
            </div>)
          )}
        </div>

        <p className="text text_type_main-medium" id="main">Начинки</p>
        <div className={burgerIngredientsStyles.cards} ref={mainRef}>
          {mains.map(item => (
            <div key={item._id} onClick={()=>handleClickIngredients(item)}>
              <IngridientCard data={item} key={item._id}/>
            </div>)
          )}
        </div>
      </div>

    </div>
  );
}

export default BurgerIngredients;
