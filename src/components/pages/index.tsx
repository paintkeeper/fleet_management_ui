import {connect} from "react-redux";
import {Dispatch} from "redux";
import {ApplicationState} from "../index";

interface PageStateProps {
    backend_uri?: string
}

interface PageDispatchProps {
}

export type PageProps = PageStateProps & PageDispatchProps

const pagesDispatchToProps = (dispatch: Dispatch): PageDispatchProps => ({})

const pagesStateToProps = (state: ApplicationState, ownProps: PageProps): PageStateProps => ({
    backend_uri: state.env.backend_uri
})

export const connector = connect<PageStateProps, PageDispatchProps, PageProps, ApplicationState>(pagesStateToProps, pagesDispatchToProps)

export * from "./notfound.page"
export * from "./home.page"
export * from "./nav.bar"
