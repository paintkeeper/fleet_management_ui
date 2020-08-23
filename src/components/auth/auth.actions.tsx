import {AnyAction} from "redux"
import {authConstants} from "./auth.constants"

export interface AuthAction extends AnyAction {
    user?: any,
    jwt?: string
}

export const authAuthenticatedAction = (user?: any): AuthAction => ({
    type: authConstants.AUTHENTICATED,
    user: user
})

export const authJwtAction = (jwt?: string): AuthAction => ({
    type: authConstants.JWT,
    jwt: jwt
})

export const authLogoutAction = (): AuthAction => ({
    type: authConstants.LOGOUT
})