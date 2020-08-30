import {authConstants} from "./auth.constants"
import {Reducer} from "redux"
import {
    authAuthenticatedState,
    authExpiryState,
    authLogoutState,
    AuthState, authTokenState,
    initialState
} from "./auth.state"
import {AuthAction} from "./auth.actions"

export const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.AUTHENTICATED:
            return authAuthenticatedState(state, action.user)
        case
        authConstants.LOGOUT:
            return authLogoutState()
        case
        authConstants.TOKEN:
            return authTokenState(state, action.token)
        case
        authConstants.EXP:
            return authExpiryState(state, action.exp)
        default:
            return state
    }
}