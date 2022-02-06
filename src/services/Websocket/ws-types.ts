import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CONNECTION_START,
    WS_CONNECTION_START_USER,
    WS_SEND_MESSAGE
} from './actions';


export type TWsActions = {
    wsInit: typeof WS_CONNECTION_START,
    wsInitUser: typeof WS_CONNECTION_START_USER,
    wsSendMessage: typeof WS_SEND_MESSAGE,
    onOpen: typeof WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR,
    onMessage: typeof WS_GET_MESSAGE
};

export const WS_ACTIONS = {
    wsInit: WS_CONNECTION_START,
    wsInitUser: WS_CONNECTION_START_USER,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};
