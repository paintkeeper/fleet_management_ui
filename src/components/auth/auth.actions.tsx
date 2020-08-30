import {AnyAction} from "redux"
import {authConstants} from "./auth.constants"

export interface AuthAction extends AnyAction {
    user?: any,
    token?: string,
    exp?: number
}

export const authAuthenticatedAction = (user?: any): AuthAction => ({
    type: authConstants.AUTHENTICATED,
    user: user
})

export const authTokenAction = (token?: string): AuthAction => ({
    type: authConstants.TOKEN,
    token: token
})

export const authLogoutAction = (): AuthAction => ({
    type: authConstants.LOGOUT
})

export const authExpiryAction = (exp?: number): AuthAction => ({
    type: authConstants.EXP,
    exp: exp
})