import {supplyConvert} from "../utils"

export interface AuthState {
    authenticated: boolean,
    user: any,
    token?: string
    exp?: number
}

export const initialState: AuthState = {
    authenticated: supplyConvert(() => window.localStorage.getItem("user"), () => true, false),
    user: supplyConvert(() => window.localStorage.getItem("user"), val => JSON.parse(val), {}),
    token: supplyConvert(() => window.localStorage.getItem("token"), val => val, undefined),
    exp: supplyConvert(() => window.localStorage.getItem("token_exp"), val => parseInt(val), undefined),
}

export const authAuthenticatedState = (state: AuthState, user?: any) => ({
    ...state,
    authenticated: true,
    user: user
})

export const authLogoutState = () => initialState

export const authTokenState = (state: AuthState, token?: string) => ({
    ...state,
    token: token
})

export const authExpiryState = (state: AuthState, exp?: number) => ({
    ...state,
    exp: exp
})