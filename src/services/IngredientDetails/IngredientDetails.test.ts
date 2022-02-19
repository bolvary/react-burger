import { ingredientDetailsReducer } from "./reducers";
import { SET_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from "./actions";

const ingOne = {
    _id: "60d3b41abdacab0026a733cd",
    name: "Соус фирменный Space Sauce",
    type: "sauce",
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v: 0,
};

describe('Детализация ингридиентов', () => {

    it("Проверка начальных данных", () => {
        // @ts-ignores
        expect(ingredientDetailsReducer(undefined, {})).toEqual(
            {
                ingredientDetails: null            
            }
          )
    })

    it("Проверка детализации ингридиентов", () => {
        expect(
            ingredientDetailsReducer(
                {
                    ingredientDetails: null 
                },
                {
                    type: SET_INGREDIENT_DETAILS,
                    payload: ingOne,
                }
        )
        ).toEqual(
            {
                ingredientDetails: ingOne
            }
        );
    });

    it("Проверка удаления деталей ингрилиента", () => {
        expect(
            ingredientDetailsReducer(
                {
                    ingredientDetails: ingOne 
                },
                {
                    type: REMOVE_INGREDIENT_DETAILS,
                }
        )
        ).toEqual(
            {
                ingredientDetails: null
            }
        );
    });
    
});
