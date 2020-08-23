import {alertConstants} from "./alert.constants"
import {Reducer} from "redux"
import {AlertAction} from "./alert.actions"
import {alertClearState, alertErrorState, alertMessageState, AlertState, initialState} from "./alert.state"

export const alertReducer: Reducer<AlertState, AlertAction> = (state = initialState, action) => {
    switch (action.type) {
        case alertConstants.ERROR:
            return alertErrorState(state, action.message)
        case alertConstants.MESSAGE:
            return alertMessageState(state, action.message)
        case alertConstants.CLEAR:
            return alertClearState()
        default:
            return state
    }
}