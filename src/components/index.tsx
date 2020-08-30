import {RouterState, connectRouter, routerMiddleware} from "connected-react-router"
import {History} from "history"
import {AuthState, authReducer, authSubscriber, authLogoutAction} from "./auth"
import {AlertState, alertReducer, alertSubscriber} from "./alert"
import {AnyAction, applyMiddleware, combineReducers, createStore, Dispatch, Middleware, Store} from "redux"
import thunk from "redux-thunk"
import {
    navigationQueryAction,
    navigationReducer,
    NavigationState,
    navigationSubscriber
} from "./navigation"
import {apiFetch, fetchConstants} from "./fetch";
import {validateToken} from "./utils";

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
    env: EnvState
}

const rootReducer = (history: History, env: EnvState) => combineReducers({
    auth: authReducer,
    alert: alertReducer,
    navigation: navigationReducer,
    router: connectRouter(history),
    env: () => env
})

const rootSubscriber = (history: History, state: ApplicationState, dispatch: Dispatch, action: AnyAction) => {
    alertSubscriber(action.type, state.alert, dispatch)
    authSubscriber(action.type, state.auth, state.env, dispatch)
    navigationSubscriber(action.type, state.navigation, dispatch, history)
}

const subscriberMiddleware = (history: History): Middleware<Store<ApplicationState>> =>
    ({dispatch, getState}) => next => action => {
        console.log(action.type)
        const returnValue = next(action)
        const search = history.location.search
        if (search && search.length > 0) {
            history.replace({
                ...history.location,
                search: ""
            })
            dispatch(navigationQueryAction(search))
        }
        rootSubscriber(history, getState(), dispatch, action)
        return returnValue
    }

const apiMiddleware = (env: EnvState): Middleware<Dispatch, ApplicationState> =>
    ({dispatch, getState}) => next => action => {
        next(action);
        if (action.type !== fetchConstants.FETCH) return
        validateToken(getState(),
            token => apiFetch(env, action.payload, dispatch, token),
            () => dispatch(authLogoutAction()))
    }

export const createRootStore = (
    history: History, env: EnvState
): Store<ApplicationState> => createStore(
    rootReducer(history, env),
    applyMiddleware(
        routerMiddleware(history),
        subscriberMiddleware(history),
        apiMiddleware(env),
        thunk
    )
)

export * from "./pages"
export * from "./alert"
export * from "./auth"
export * from "./routes"