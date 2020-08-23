export interface NavigationState {
    loading: boolean,
    query?: string
}

export const initialState: NavigationState = {
    loading: false,
    query: undefined
}

export const navigationQueryState = (state: NavigationState, query?: string): NavigationState => {
    return {
        ...state,
        loading: true,
        query: query
    }
}

export const navigationLoadingState = (state: NavigationState, loading?: boolean): NavigationState => {
    return {
        ...state,
        loading: !!loading
    }
}

export const navigationClear = (): NavigationState => initialState