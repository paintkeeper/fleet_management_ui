import {Dispatch} from "redux"
import {navigationConstants} from "./navigation.constants"
import {NavigationState} from "./navigation.state"
import {authJwtAction} from "../auth"
import {navigationClearAction} from "./navigation.actions";

export const navigationSubscriber = (type: any, state: NavigationState, dispatch: Dispatch) => {
    switch (type) {
        case navigationConstants.QUERY:
            if (state.query) querySubscriber(state.query, dispatch)
            break
    }
}

const querySubscriber = (query: string, dispatch: Dispatch) => {
    const params = new URLSearchParams(query)
    const jwt = params.get("jwt")
    if (jwt) {
        dispatch(authJwtAction(jwt))
    } else {
        dispatch(navigationClearAction())
    }
}
