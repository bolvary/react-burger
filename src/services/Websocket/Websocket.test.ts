import { websocketReducer } from './reducer';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CONNECTION_START,
} from './actions';

const initialState = {
    wsConnected: false,
    ordersInfo: []
};

const testSampleOrder = {
    success: true,
    orders: [
        {
        ingredients: ["1111", "2222", "3333"],
        _id: "123456",
        status: "done",
        number: 1000,
        createdAt: "2022-03-02 01:22:10",
        updatedAt: "2022-03-02 11:22:10",
        name: "TESTS_ORDER_NAME",
        },
    ],
    total: 10,
    totalToday: 100,
};

describe('Проверка вебсокета', () => {

    it("Проверка начальных данных", () => {
        // @ts-ignores
        expect(websocketReducer(undefined, {})).toEqual(initialState)
    })

    it("Проверка успешного коннекта", () => {
        expect(
            websocketReducer(initialState,
                {
                    type: WS_CONNECTION_SUCCESS,
                }
        )
        ).toEqual(
            {
                ...initialState,
                error: undefined,
                wsConnected: true,
            }
        );
    });

    it("Проверка ошибки коннекта", () => {
        expect(
            websocketReducer(initialState,
                {
                    type: WS_CONNECTION_ERROR,
                }
        )
        ).toEqual(
            {
                ...initialState,
            }
        );
    });

    it("Проверка закрытия коннекта", () => {
        expect(
            websocketReducer(
                {
                    ...initialState,
                    wsConnected: true,
                },
                {
                    type: WS_CONNECTION_CLOSED,
                }
        )
        ).toEqual(
            {
                ...initialState,
            }
        );
    });

    it("Проверка начала коннекта", () => {
        expect(
            websocketReducer(
                {
                    ...initialState,
                },
                {
                    type: WS_CONNECTION_START,
                }
        )
        ).toEqual(
            {
                ...initialState,
            }
        );
    });

    it("Проверка получения данных", () => {
        expect(
            websocketReducer(
                {
                    ...initialState,
                    wsConnected: true,
                },
                {
                    type: WS_GET_MESSAGE,
                    payload: testSampleOrder
                }
        )
        ).toEqual(
            {
                ...initialState,
                wsConnected: true,
                ordersInfo: testSampleOrder,
            }
        );
    });
    
});
