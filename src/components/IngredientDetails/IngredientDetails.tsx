import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import Modal from '../Modal/Modal';
import { getAllIngredients } from '../../services/AllIngridients/selectors';
import { getIngredientDetails } from '../../services/IngredientDetails/selectors';

import ingredientDetailsStyles from './IngredientDetails.module.css';
import { TLocation, TParams } from '../../utils/types';

const IngredientDetails: React.FC = () => {
    const { id } = useParams<TParams>();
    const productData = useSelector(getAllIngredients);
    const ingredientDetails = useSelector(getIngredientDetails) || productData.find((product) => product._id === id);
    const { state } = useLocation<TLocation>();
    const isModalOpen = state && state.modal;
    const history = useHistory();

    const { image_large, name, calories, fat, proteins, carbohydrates } = ingredientDetails;
    const kbzu = [
        {name: 'Калории,ккал', value: calories},
        {name: 'Белки, г', value: proteins},
        {name: 'Жиры, г', value: fat},
        {name: 'Углеводы, г', value: carbohydrates},
    ];
    const content = (
        <div className={ingredientDetailsStyles.ingredientDetails}>
            {!isModalOpen && <p className={`${ingredientDetailsStyles.text} text text_type_main-medium`}>Детали ингредиента</p>}
            <img alt='' src={image_large} />
            <p className={`${ingredientDetailsStyles.text} text text_type_main-medium`}>{name}</p>
            <div className={ingredientDetailsStyles.kbzu}>
                {kbzu.map((item, index) => (
                    <div key={index} className={ingredientDetailsStyles.ingredient}>
                        <p className='text text_type_main-default text_color_inactive'>{item.name}</p>
                        <p className='text text_type_digits-default text_color_inactive'>{item.value}</p>
                    </div>
                ))}
            </div>
        </div> 
    );

    return(
        <>
        {isModalOpen ? (
          <Modal onClose={() => history.goBack()} title="Детали ингредиента">
            {content}
          </Modal>
        ) : (
          content
        )}
      </>
    )
};

export default IngredientDetails;
