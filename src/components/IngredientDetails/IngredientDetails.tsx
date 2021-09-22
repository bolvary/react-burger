import React from 'react';
import PropTypes from 'prop-types';
import ingredientDetailsStyles from './IngredientDetails.module.css';

const IngredientDetails = (data) => { 
    const { image_large, name, calories, fat, proteins, carbohydrates } = data.data;
    const kbzu = [
        {name: 'Калории,ккал', value: calories},
        {name: 'Белки, г', value: proteins},
        {name: 'Жиры, г', value: fat},
        {name: 'Углеводы, г', value: carbohydrates},
    ];

    return(
        <div className={ingredientDetailsStyles.ingredientDetails}>
            <img src={image_large} />
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
    )
}

IngredientDetails.propTypes = {
    data: PropTypes.shape({
      calories: PropTypes.number,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      name: PropTypes.string,
      image_large: PropTypes.string,
    }).isRequired,
  };

export default IngredientDetails;
