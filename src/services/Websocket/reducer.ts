import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CONNECTION_START,
    TWebsocketActions
} from './actions';

const initialState = {
    wsConnected: false,
    ordersInfo: []
  };

export const websocketReducer = (state = initialState, action: TWebsocketActions) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
        return {
            ...state,
            error: undefined,
            wsConnected: true
        };
        case WS_CONNECTION_START:
            return {
                ...state,
            }
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };
        case WS_GET_MESSAGE:
            return {
                ...state,
                error: undefined,
                ordersInfo: action.payload
            };
        default:
            return state;
    }
};
