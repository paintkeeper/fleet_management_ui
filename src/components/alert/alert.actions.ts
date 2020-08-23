import {AnyAction} from "redux"
import {alertConstants} from "./alert.constants"

export interface AlertAction extends AnyAction {
    message?: string,
    error?: any
}

export const alertMessageAction = (message: string): AlertAction => ({
    type: alertConstants.MESSAGE,
    message: message
})

export const alertErrorAction = (error: string): AlertAction => ({
    type: alertConstants.ERROR,
    error: error
})