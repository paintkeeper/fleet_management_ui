import {AnyAction, Dispatch} from "redux";
import {EnvState} from "../index";

export const fetchConstants = {
    FETCH: "FETCH/FETCH",
}

export interface FetchAction extends AnyAction {
    payload: FetchPayload
}

export interface FetchPayload {
    path: string,
    id?: string,
    onSuccess: (result: any) => void,
    onError: (error: any) => void,
    finally?: () => void
}

export const apiFetchAction = (payload: FetchPayload): FetchAction => ({
    type: fetchConstants.FETCH,
    payload: payload
})

export const apiFetch = (env: EnvState, payload: FetchPayload, dispatch: Dispatch, token?: string) => {
    fetch(`${env.backend_uri}/${env.api_version}/${payload.path}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(payload.onSuccess)
        .catch(payload.onError)
        .finally(payload.finally)
}

export * from "./cars.fetch"