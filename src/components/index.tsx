import {RouterState, connectRouter, routerMiddleware} from "connected-react-router"
import {History} from "history"
import {AuthState, authReducer} from "./auth"
import {AlertState, alertReducer} from "./alert"
import {Action, applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"
import {navigationReducer, NavigationState} from "./navigation"

export interface ActionState {
    current?: Action
}

export interface EnvState {
    client_id?: string,
    scope?: string,
    backend_uri?: string,
    generated_id?: string,
    api_version?: string
}

export interface ApplicationState {
    auth: AuthState,
    alert: AlertState,
    navigation: NavigationState,
    router: RouterState,
    env: EnvState,
    action: ActionState
}

const rootReducer = (history: History, env: EnvState) => combineReducers({
    auth: authReducer,
    alert: alertReducer,
    navigation: navigationReducer,
    router: connectRouter(history),
    env: () => env,
    action: (s = {}, a) => ({current: a})
})

export const createRootStore = (
    history: History, env: EnvState
) => createStore(
    rootReducer(history, env),
    applyMiddleware(routerMiddleware(history), thunk)
)

export * from "./pages"
export * from "./alert"
export * from "./auth"
export * from "./routes"