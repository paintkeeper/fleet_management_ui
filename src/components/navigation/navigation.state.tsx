export interface NavigationState {
    query?: string,
    pathname?: string
}

export const initialState: NavigationState = {
    query: undefined,
    pathname: undefined
}

export const navigationQueryState = (state: NavigationState, query?: string, pathname?: string): NavigationState => {
    return {
        ...state,
        query: query,
        pathname: pathname
    }
}

export const navigationClear = (): NavigationState => initialState