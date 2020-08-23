import React from "react"
import {Redirect, Route} from "react-router-dom"
import {ApplicationState} from "../index"
import {connect} from "react-redux"
import {RouteProps} from "react-router-dom"

interface AuthenticatedProps extends RouteProps {
    authenticated?: boolean
}

const connector = connect((state: ApplicationState) => ({
        authenticated: state.auth.authenticated
    }), {}
)

const ProtectedRouter: React.FC<AuthenticatedProps> = ({authenticated, children, ...rest}) => (

    <Route
        {...rest}
        render={({location}) =>
            authenticated ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: location}
                    }}
                />
            )
        }
    />
)

export default connector(ProtectedRouter)