import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import {createBrowserHistory} from "history"
import {createRootStore} from "./components"

const history = createBrowserHistory()

const store = createRootStore(history, {
    client_id: process.env.REACT_APP_CLIENT_ID,
    scope: process.env.REACT_APP_CLIENT_SCOPE,
    backend_uri: process.env.REACT_APP_BACKEND,
    api_version: process.env.REACT_APP_APIVERSION,
    generated_id: Math.random().toString(36).substring(2, 15)
        + Math.random().toString(36).substring(2, 15)
})


ReactDOM.render(
    <App store={store} history={history}/>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()