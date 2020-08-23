import {Dispatch} from "redux"
import {AlertState} from "./alert.state"
import {alertConstants} from "./alert.constants"

export const alertSubscriber = (type: any, state: AlertState, dispatch: Dispatch) => {
    switch (type) {
        case alertConstants.ERROR:
            if (state.error) errorSubscriber(state.error, dispatch)
            break
        case alertConstants.MESSAGE:
            if (state.message) messageSubscriber(state.message, dispatch)
    }
}

const messageSubscriber = (info: string, dispatch: Dispatch) => {

}

const errorSubscriber = (error: string, dispatch: Dispatch) => {

}
