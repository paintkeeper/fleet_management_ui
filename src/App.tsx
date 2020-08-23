import React from "react"
import "./App.css"
import "semantic-ui-css/semantic.min.css"
import {Provider} from "react-redux"
import {Action, Dispatch, Store} from "redux"
import {History} from "history"
import {ConnectedRouter} from "connected-react-router"
import {ApplicationState, authSubscriber, alertSubscriber} from "./components"
import Routes from "./components/routes"
import {Container, Divider} from "semantic-ui-react"
import {navigationQueryAction, navigationSubscriber} from "./components/navigation"

interface MainProps {
    store: Store<ApplicationState>
    history: History
}

const rootSubscriber = (dispatch: Dispatch, state: ApplicationState, action?: Action) => {
    if (action) {
        console.log(action.type)
        alertSubscriber(action.type, state.alert, dispatch)
        authSubscriber(action.type, state.auth, state.env, dispatch)
        navigationSubscriber(action.type, state.navigation, dispatch)
    }
}

const App: React.FC<MainProps> = ({store, history}) => {
    store.subscribe(() => rootSubscriber(store.dispatch, store.getState(), store.getState().action.current))
    const search = history.location.search
    if (search && search.length > 0) {
        history.replace({
            ...history.location,
            search: ""
        })
        store.dispatch(navigationQueryAction(search))
    }
    return (
        <Container>
            <Divider hidden/>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Routes/>
                </ConnectedRouter>
            </Provider>
        </Container>
    )
}

export default App
