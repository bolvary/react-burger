export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS'; 
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_CONNECTION_START_USER: 'WS_CONNECTION_START_USER' = 'WS_CONNECTION_START_USER';

export interface IWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly error?: any;
    readonly payload?: any;
}

export interface IWsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: any;
}

export interface IWsSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: any;
}

export interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
}

export type TWebsocketActions = 
    | IWsConnectionSuccessAction
    | IWsConnectionErrorAction
    | IWsConnectionClosedAction
    | IWsGetMessageAction
    | IWsSendMessageAction
    | IWsConnectionStartAction;

export const wsConnectionSuccess = (): IWsConnectionSuccessAction => {
    return {
        type: WS_CONNECTION_SUCCESS
    };
};

export const wsConnectionStart = (): IWsConnectionStartAction => {
    return {
        type: WS_CONNECTION_START
    }
}

export const wsConnectionError = (): IWsConnectionErrorAction => {
    return {
        type: WS_CONNECTION_ERROR
    };
};

export const wsConnectionClosed = (): IWsConnectionClosedAction => {
    return {
        type: WS_CONNECTION_CLOSED
    };
};

export const wsGetMessage = (message: any): IWsGetMessageAction => {
    return {
        type: WS_GET_MESSAGE,
        payload: message
    };
};

export const wsSendMessage = (message: any): IWsSendMessageAction => {
    return {
        type: WS_SEND_MESSAGE,
        payload: message
    };
};
