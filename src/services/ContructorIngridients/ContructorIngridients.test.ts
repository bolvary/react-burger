import { selectedIngredientsReducer } from "./reducers";
import { ADD_BUNS, ADD_INGREDIENTS, CHANGE_INGREDIENTS, REMOVE_BUNS, CLEAR_ALL_INGREDIENTS } from "./actions";

const bun = {
    _id: "60d3b41abdacab0026a733c7",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
};

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

const ingOneExpect = {
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
    uuid: "e8aa6c78-0099-4547-a720-f9e532dcd371",
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
    uuid: "7f5ae7e5-9486-4de5-bf27-6f5ee1670a71"
};

const changeIng0 = {
    fromIndex: 0,
    toIndex: 1
}

describe('Конструктор ингридиентов', () => {

    it("Проверка начальных данных", () => {
        // @ts-ignores
        expect(selectedIngredientsReducer(undefined, {})).toEqual(
            {
                buns: null,
                selectedIngredients: []            
            }
          )
    })

    it("Проверка добавления булки", () => {
        expect(
        selectedIngredientsReducer(
            {
                buns: null,
                selectedIngredients: []
            },
            {
                type: ADD_BUNS,
                payload: bun,
            }
        )
        ).toEqual(
        {
            buns: bun,
            selectedIngredients: []
        }
        );
    });

    it("Проверка удаления булки", () => {
        expect(
        selectedIngredientsReducer(
            {
                buns: bun,
                selectedIngredients: []
            },
            {
                type: REMOVE_BUNS,
            }
        )
        ).toEqual(
        {
            buns: null,
            selectedIngredients: []
        }
        );
    });

    it("Проверка добавления ингридиента", () => {
        expect(
        selectedIngredientsReducer(
            {
                buns: null,
                selectedIngredients: []
            },
            {
                type: ADD_INGREDIENTS,
                payload: ingOne,
                uuid: "e8aa6c78-0099-4547-a720-f9e532dcd371",
            }
        )
        ).toEqual(
        {
            buns: null,
            selectedIngredients: [ingOneExpect]
        }
        );
    });

    it("Проверка изменения мест ингридиентов", () => {
        expect(
        selectedIngredientsReducer(
            {
                buns: null,
                selectedIngredients: [ingOne, ingTwo]
            },
            {
                type: CHANGE_INGREDIENTS,
                payload: changeIng0,
            }
        )
        ).toEqual(
        {
            buns: null,
            selectedIngredients: [ingTwo, ingOne]
        }
        );
    });

    it("Проверка удаления всех ингридиентов", () => {
        expect(
        selectedIngredientsReducer(
            {
                buns: bun,
                selectedIngredients: [ingOne, ingTwo]
            },
            {
                type: CLEAR_ALL_INGREDIENTS,
            }
        )
        ).toEqual(
        {
            buns: null,
            selectedIngredients: []
        }
        );
    });
    
});
