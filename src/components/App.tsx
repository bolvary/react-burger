import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { getProducts } from '../services/AllIngridients/actions';
import { checkUser } from '../services/Auth/actions';
import AppHeader from './AppHeader/AppHeader';
import BurgerConstructor from './BurgerConstructor/BurgerConstructor';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import IngredientDetails from './IngredientDetails/IngredientDetails';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

import { 
  LoginPage,
  ForgotPasswordPage,
  RegisterPage,
  ResetPasswordPage,
  ProfilePage,
  ErrorPage,
} from '../pages';

import appStyles from './App.module.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { ingredientsIsLoaded, ingredientsLoadedError } = useSelector(state => state['ingredients']);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <Router>
      <div className={appStyles.app}>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <main className="mainContent">
            {!ingredientsIsLoaded && (
                <p className="text text_type_main-small">Загрузка...</p>
            )}
            {ingredientsLoadedError && (
                <p className="text text_type_main-small">
                  Ошибка загрузки данных.
                  Попробуйте обновить страницу.
                </p>
            )}
            {ingredientsIsLoaded &&
              <Switch>
                <Route path="/" exact>
                  <BurgerIngredients/>
                  <BurgerConstructor/>
                </Route>
                <Route path="/login">
                  <LoginPage/>
                </Route>
                <Route path="/forgot-password">
                  <ForgotPasswordPage/>
                </Route>
                <Route path="/register">
                  <RegisterPage/>
                </Route>
                <Route path="/reset-password">
                  <ResetPasswordPage/>
                </Route>
                <ProtectedRoute path="/profile">
                  <ProfilePage/>
                </ProtectedRoute>
                <Route path="/ingredients/:id" exact>
                  <IngredientDetails/>
                </Route>
                <Route>
                  <ErrorPage/>
                </Route>
              </Switch>
            }
          </main>
        </DndProvider>
      </div>
    </Router>
  );
}

export default App;
