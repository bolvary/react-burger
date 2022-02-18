import { allIngredientReducer } from "./reducers";
import { LOAD_INGREDIENTS, LOAD_INGREDIENTS_ERROR } from "./actions";

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

const ingTwo = {
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

describe('Загрузка игридиентов', () => {

    it("Проверка начальных данных", () => {
        // @ts-ignores
        expect(allIngredientReducer(undefined, {})).toEqual(
            {
                ingredients: [],
                ingredientsIsLoaded: false,
                ingredientsLoadedError: false,     
            }
          )
    })

    it("Успешная загрузка ингридиентов", () => {
        expect(
            allIngredientReducer(
                {
                    ingredients: [],
                    ingredientsIsLoaded: false,
                    ingredientsLoadedError: false,
                },
                {
                    type: LOAD_INGREDIENTS,
                    data: [ingOne, ingTwo],
                    
                }
        )
        ).toEqual(
            {
                ingredients: [ingOne, ingTwo],
                ingredientsIsLoaded: true,
                ingredientsLoadedError: false,
            }
        );
    });

    it("Ошибка при загрузке ингридиентов", () => {
        expect(
            allIngredientReducer(
                {
                    ingredients: [],
                    ingredientsIsLoaded: false,
                    ingredientsLoadedError: false,
                },
                {
                    type: LOAD_INGREDIENTS_ERROR,
                }
        )
        ).toEqual(
            {
                ingredients: [],
                ingredientsIsLoaded: false,
                ingredientsLoadedError: true,
            }
        );
    });
    
});
