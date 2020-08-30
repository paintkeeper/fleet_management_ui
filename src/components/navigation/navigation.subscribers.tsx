import {Dispatch} from "redux"
import {navigationConstants} from "./navigation.constants"
import {NavigationState} from "./navigation.state"
import {authTokenAction} from "../auth"
import {navigationClearAction} from "./navigation.actions";
import {History} from "history"

export const navigationSubscriber = (type: any, state: NavigationState, dispatch: Dispatch, history: History) => {
    switch (type) {
        case navigationConstants.QUERY:
            if (state.query) querySubscriber(dispatch, history, state.query, state.pathname)
            break
    }
}

const querySubscriber = (dispatch: Dispatch, history: History, query: string, pathname?: string) => {
    const params = new URLSearchParams(query)
    const jwt = params.get("jwt")
    if (jwt) {
        dispatch(authTokenAction(jwt))
    } else {
        dispatch(navigationClearAction())
    }
    history.replace({
        pathname: pathname
    })
}
