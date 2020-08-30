import React, {Reducer, useEffect, useReducer} from "react"
import {Button, Header, Image, Modal} from "semantic-ui-react";

interface CarDialogContent {
    open: boolean,
    carId?: String
}

enum ActionType {
    CAR_DIALOG_OPEN,
    CAR_DIALOG_CLOSE
}

export interface CarDialogAction {
    type: ActionType,
    carId?: String
}

const initialState: CarDialogContent = {
    open: false
}

export const carDialogReducer: Reducer<CarDialogContent, CarDialogAction> = (state, action) => {
    switch (action.type) {
        case ActionType.CAR_DIALOG_OPEN:
            return {
                ...state,
                open: true,
                carId: action.carId
            }
        case ActionType.CAR_DIALOG_CLOSE:
            return initialState
        default:
            throw Error()
    }
}

export interface CarDialogProps {
    carId?: string
}

const CarDialog: React.FC<CarDialogProps> = ({carId}) => {
    const [state, dispatch] = useReducer(carDialogReducer, initialState)
    useEffect(() => {
        carId && dispatch({
            type: ActionType.CAR_DIALOG_OPEN,
            carId: carId
        })
    }, [carId])
    return carId ? (
        <>
            <Modal
                dimmer={"inverted"}
                open={state.open}
            >
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
                    <Image size='medium' src='/images/avatar/large/rachel.png' wrapped/>
                    <Modal.Description>
                        <Header>{carId}</Header>
                        <p>
                            We've found the following gravatar image associated with your e-mail
                            address.
                        </p>
                        <p>Is it okay to use this photo?</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => {
                        dispatch({type: ActionType.CAR_DIALOG_CLOSE})
                    }}>
                        Nope
                    </Button>
                </Modal.Actions>
            </Modal>
        </>) : (<></>)
}
export default CarDialog