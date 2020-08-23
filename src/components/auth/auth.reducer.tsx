import {authConstants} from "./auth.constants"
import {Reducer} from "redux"
import {
    authAuthenticatedState, authJwtState,
    authLogoutState,
    AuthState,
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
            authConstants.JWT:
            return authJwtState(state, action.jwt)
        default:
            return state
    }
}