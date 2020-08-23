import {MapStateToProps} from "react-redux";
import {ApplicationState} from "../index";

export interface EnvProps {
    backend_uri?: string,
    api_version?: string,
    jwt?: string
}

export const pagesMapStateToProps: MapStateToProps<EnvProps, EnvProps, ApplicationState> =
    (state, ownProps) => ({
        backend_uri: state.env.backend_uri,
        api_version: state.env.api_version,
        jwt: state.auth.jwt
    })

export * from "./notfound.page"
export * from "./home.page"
export * from "./nav.bar"
