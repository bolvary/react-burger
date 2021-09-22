import React, {useEffect, useState} from 'react';
import AppHeader from './AppHeader/AppHeader';
import BurgerConstructor from './BurgerConstructor/BurgerConstructor';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import { API_ADDRESS } from '../constants';

const App = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetch(API_ADDRESS)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response.status);
      })
      .then(data => {
        setProductData(data.data);
      })
      .catch(err => alert(`Ой! Что-то пошло не так! ${err}`));
  }, []);

  return (
    <div className="App">
      <AppHeader />
        <main className="mainContent">
          <BurgerIngredients productData={productData} />
          {/* Прокинуть данные потом */}
          <BurgerConstructor /> 
        </main>
    </div>
  );
}

export default App;
