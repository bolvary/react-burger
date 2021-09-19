import React, {useEffect, useState} from 'react';
import AppHeader from './AppHeader/AppHeader';
import BurgerConstructor from './BurgerConstructor/BurgerConstructor';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import { API_ADDRESS } from '../constants';

const App = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    try {
      fetch(API_ADDRESS)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setProductData(data.data);
        })
        .catch(err => alert(`Ой! Что-то пошло не так! ${err}`));
    } catch(error) {console.log('Возникла проблема с вашим fetch запросом: ', error.message)} 
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
