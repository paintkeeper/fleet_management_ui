import {Reducer} from "redux"
import {NavigationAction} from "./navigation.actions"
import {navigationConstants} from "./navigation.constants"
import {
    initialState,
    navigationClear,
    navigationQueryState,
    NavigationState
} from "./navigation.state"

export const navigationReducer: Reducer<NavigationState, NavigationAction> = (state = initialState, action) => {
    switch (action.type) {
        case navigationConstants.QUERY:
            return navigationQueryState(state, action.query, action.pathname)
        case navigationConstants.CLEAR:
            return navigationClear()
        default:
            return state
    }
}