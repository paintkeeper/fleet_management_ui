import {Dispatch} from "redux"
import {authAuthenticatedAction} from "./auth.actions"
import {AuthState} from "./auth.state"
import {EnvState} from "../index"
import {authConstants} from "./auth.constants"
import {navigationClearAction, navigationLoadingAction} from "../navigation"
import {parseJwt} from "../utils";

export const authSubscriber = (type: any, state: AuthState, env: EnvState, dispatch: Dispatch) => {
    switch (type) {
        case authConstants.AUTHENTICATED:
            if (state.user) authenticatedSubscriber(state.user, dispatch)
            break
        case authConstants.LOGOUT:
            logoutSubscriber(dispatch)
            break
        case authConstants.JWT:
            if (state.jwt) jwtSubscriber(state.jwt, dispatch)
    }
}

const jwtSubscriber = (jwt: string, dispatch: Dispatch) => {
    window.localStorage.setItem("jwt", jwt)
    dispatch(authAuthenticatedAction(parseJwt(jwt).principal))
}

const authenticatedSubscriber = (user: any, dispatch: Dispatch) => {
    window.localStorage.setItem("user", JSON.stringify(user))
    dispatch(navigationClearAction())
}

const logoutSubscriber = (dispatch: Dispatch) => {
    dispatch(navigationLoadingAction(true))
    window.localStorage.clear()
    window.location.replace("/")
    dispatch(navigationClearAction())
}