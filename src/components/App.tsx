import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../services/AllIngridients/actions';
import AppHeader from './AppHeader/AppHeader';
import BurgerConstructor from './BurgerConstructor/BurgerConstructor';
import appStyles from './App.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className="mainContent">
          <BurgerIngredients />
          <BurgerConstructor /> 
        </main>
      </DndProvider>
    </div>
  );
}

export default App;
