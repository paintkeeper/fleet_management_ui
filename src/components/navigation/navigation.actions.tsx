import {AnyAction} from "redux"
import {navigationConstants} from "./navigation.constants"

export interface NavigationAction extends AnyAction {
    query?: string,
    loading?: boolean
}

export const navigationQueryAction = (query?: string): NavigationAction => ({
    type: navigationConstants.QUERY,
    query: query
})

export const navigationLoadingAction = (loading?: boolean): NavigationAction => ({
    type: navigationConstants.LOADING,
    loading: loading
})
export const navigationClearAction = (): NavigationAction => ({
    type: navigationConstants.CLEAR
})
