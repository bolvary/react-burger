import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { useInView } from 'react-intersection-observer';
import { useHistory } from 'react-router-dom';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { setIngredientDetails } from '../../services/IngredientDetails/actions';
import IngridientCard from './components/IngridientCard';
import { getAllIngredients } from '../../services/AllIngridients/selectors'
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import { TIngridientData } from '../../utils/types';

const BurgerIngredients: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const productData = useSelector(getAllIngredients);

  const [current, setCurrent] = useState('bun');
  const buns = useMemo(() => { return productData.filter(item => item.type === 'bun') }, [productData]);
  const sauces = useMemo(() => { return productData.filter(item => item.type === 'sauce') }, [productData]);
  const mains = useMemo(() => { return productData.filter(item => item.type === 'main') }, [productData]);

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

  const handleClickIngredients = (item: TIngridientData) => {
    dispatch(setIngredientDetails(item));
    history.push({
      pathname: `/ingredients/${item._id}`,
      state: { modal: true },
    });
  };

  return (
    <div className={burgerIngredientsStyles.burgerIngredients}>
      <p className="text text_type_main-large">???????????????? ????????????</p>
      <div className={burgerIngredientsStyles.tab}>
        <Tab value="bun" active={current === 'bun'} onClick={setTab}>??????????</Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setTab}>??????????</Tab>
        <Tab value="main" active={current === 'main'} onClick={setTab}>??????????????</Tab>
      </div>

      <div className={burgerIngredientsStyles.customScroll}>
        <p className="text text_type_main-medium" id="bun">??????????</p>
        <div className={burgerIngredientsStyles.cards} ref={bunRef}>
          {buns.map(item => (
            <div key={item._id} onClick={()=>handleClickIngredients(item)}>
              <IngridientCard data={item} />
            </div>)
          )}
        </div>

        <p className="text text_type_main-medium" id="sauce">??????????</p>
        <div className={burgerIngredientsStyles.cards} ref={sauceRef}>
          {sauces.map(item => (
            <div key={item._id} onClick={()=>handleClickIngredients(item)}>
              <IngridientCard data={item} key={item._id}/>
            </div>)
          )}
        </div>

        <p className="text text_type_main-medium" id="main">??????????????</p>
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
