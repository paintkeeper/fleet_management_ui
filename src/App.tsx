import React from "react"
import "./App.css"
import "semantic-ui-css/semantic.min.css"
import {Provider} from "react-redux"
import {Store} from "redux"
import {History} from "history"
import {ConnectedRouter} from "connected-react-router"
import {ApplicationState} from "./components"
import Routes from "./components/routes"
import {Container, Divider} from "semantic-ui-react"

interface MainProps {
    store: Store<ApplicationState>
    history: History
}

const App: React.FC<MainProps> = ({store, history}) => {
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
