import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import reportWebVitals from './reportWebVitals';
import { data } from './utils/data';

ReactDOM.render(
  <React.StrictMode>
    <AppHeader />
    <main className="mainContent">
      <BurgerIngredients productData={data}/>
      <BurgerConstructor productData={data}/>
    </main>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
