import { orderReducer } from "./reducers";
import { SET_ORDER_ID, REMOVE_ORDER_ID } from "./actions";

const ordrIdTest = 123456;

describe('Формирование заказа', () => {

    it("Проверка начальных данных", () => {
        // @ts-ignores
        expect(orderReducer(undefined, {})).toEqual(
            {
                orderId: null         
            }
          )
    })

    it("Проверка присвоения номера заказу", () => {
        expect(
            orderReducer(
                {
                    orderId: null 
                },
                {
                    type: SET_ORDER_ID,
                    payload: ordrIdTest,
                }
        )
        ).toEqual(
            {
                orderId: ordrIdTest
            }
        );
    });

    it("Проверка удаления номера заказа", () => {
        expect(
            orderReducer(
                {
                    orderId: ordrIdTest 
                },
                {
                    type: REMOVE_ORDER_ID,
                }
        )
        ).toEqual(
            {
                orderId: null
            }
        );
    });
    
});
