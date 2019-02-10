export enum ActionType {
    CHANGE_SEARCH_QUERY,

    LOAD_SEARCH_RESULTS,
    LOAD_SEARCH_RESULTS_FULFILLED,
}

export interface ReduxAction {
    type: ActionType;
    payload?: any;
}

export interface ReduxState {
    searchQuery: string;
    searchResults: any[];
    isLoading: boolean;
}

export const INITIAL_STATE: ReduxState = {
    searchQuery: '',
    searchResults: [],
    isLoading: false
};

export const reducer = (state = INITIAL_STATE, action: ReduxAction): ReduxState => {
    console.log({ state, action });
    switch (action.type) {
        case ActionType.CHANGE_SEARCH_QUERY:
            const searchQuery = action.payload.searchQuery;
            return {
                ...state,
                searchQuery,
                searchResults: []
            };

        default: {
            return state;
        }
    }
};
