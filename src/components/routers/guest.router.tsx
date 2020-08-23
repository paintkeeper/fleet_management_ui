import {Redirect, Route, RouteProps} from "react-router-dom"
import {connect} from "react-redux"
import {ApplicationState} from "../index"
import React from "react"

interface AuthenticatedProps extends RouteProps {
    authenticated?: boolean
}

const connector = connect((state: ApplicationState) => ({
        authenticated: state.auth.authenticated
    }), {}
)

const GuestRouter: React.FC<AuthenticatedProps> = ({authenticated, children, ...rest}) => (
    <Route
        {...rest}
        render={({location}) =>
            authenticated ? (
                <Redirect
                    to={{
                        pathname: "/",
                        state: {from: location}
                    }}
                />
            ) : (
                children
            )
        }
    />
)

export default connector(GuestRouter)