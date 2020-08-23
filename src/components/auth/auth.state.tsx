import {supplyConvert} from "../utils"

export interface AuthState {
    authenticated: boolean,
    user: any,
    jwt?: string
}

export const initialState: AuthState = {
    authenticated: supplyConvert(() => window.localStorage.getItem("user"), () => true, false),
    user: supplyConvert(() => window.localStorage.getItem("user"), val => JSON.parse(val), {}),
    jwt: supplyConvert(() => window.localStorage.getItem("jwt"), val => val, undefined),
}

export const authAuthenticatedState = (state: AuthState, user?: any) => ({
    ...state,
    authenticated: true,
    user: user
})

export const authLogoutState = () => initialState

export const authJwtState = (state: AuthState, jwt?: string) => ({
    ...state,
    jwt: jwt
})