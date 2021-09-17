import React from 'react';
import './App.css';
import AppHeader from './AppHeader/AppHeader';
import BurgerConstructor from './BurgerConstructor/BurgerConstructor';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import { data } from '../utils/data';

function App() {
  return (
    <div className="App">
        <AppHeader />
        <main className="mainContent">
        <BurgerIngredients productData={data}/>
        <BurgerConstructor productData={data}/>
    </main>
    </div>
  );
}

export default App;