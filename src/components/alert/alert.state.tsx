export interface AlertState {
    error?: string,
    message?: string
}

export const initialState: AlertState = {
    error: undefined,
    message: undefined
}

export const alertErrorState = (state: AlertState, error?: string): AlertState => {
    return {
        ...state,
        error: error
    }
}

export const alertMessageState = (state: AlertState, message?: string): AlertState => {
    return {
        ...state,
        message: message
    }
}

export const alertClearState = (): AlertState => {
    return initialState
}