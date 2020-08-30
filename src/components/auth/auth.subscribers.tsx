import {Dispatch} from "redux"
import {authAuthenticatedAction, authExpiryAction} from "./auth.actions"
import {AuthState} from "./auth.state"
import {EnvState} from "../index"
import {authConstants} from "./auth.constants"
import {navigationClearAction} from "../navigation"
import {parseJwt, supplyConvert} from "../utils";

export const authSubscriber = (type: any, state: AuthState, env: EnvState, dispatch: Dispatch) => {
    switch (type) {
        case authConstants.AUTHENTICATED:
            if (state.user) authenticatedSubscriber(state.user, dispatch)
            break
        case authConstants.LOGOUT:
            logoutSubscriber(dispatch)
            break
        case authConstants.TOKEN:
            if (state.token) tokenSubscriber(state.token, dispatch)
    }
}

const tokenSubscriber = (token: string, dispatch: Dispatch) => {
    window.localStorage.setItem("token", token)
    const data = parseJwt(token)
    const iat = supplyConvert(() => data.iat, val => parseInt(val), 0)
    const exp = supplyConvert(() => data.exp, val => parseInt(val), 0)
    if (iat && exp) {
        const multiplier = Math.pow(10, (Math.log10(Date.now()) | 0) - (Math.log10(exp) | 0))
        const token_exp = exp * multiplier
        window.localStorage.setItem("token_exp", token_exp.toString())
        dispatch(authExpiryAction(token_exp))
    }
    dispatch(authAuthenticatedAction(data.principal))
}

const authenticatedSubscriber = (user: any, dispatch: Dispatch) => {
    window.localStorage.setItem("user", JSON.stringify(user))
    dispatch(navigationClearAction())
}

const logoutSubscriber = (dispatch: Dispatch) => {
    window.localStorage.clear()
    window.location.replace("/")
    dispatch(navigationClearAction())
}