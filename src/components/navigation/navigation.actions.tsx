import {AnyAction} from "redux"
import {navigationConstants} from "./navigation.constants"

export interface NavigationAction extends AnyAction {
    query?: string,
    pathname?: string
}

export const navigationQueryAction = (query?: string, pathname?: string): NavigationAction => ({
    type: navigationConstants.QUERY,
    query: query,
    pathname: pathname
})

export const navigationClearAction = (): NavigationAction => ({
    type: navigationConstants.CLEAR
})
