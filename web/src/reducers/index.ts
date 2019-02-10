export enum ActionType {
    CHANGE_SEARCH_QUERY,

    LOAD_SEARCH_RESULTS,
    LOAD_SEARCH_RESULTS_FULFILLED,
    LOAD_SEARCH_RESULTS_REJECTED,
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

        case ActionType.LOAD_SEARCH_RESULTS:
            return {
                ...state,
                isLoading: true
            };

        case ActionType.LOAD_SEARCH_RESULTS_FULFILLED:
            return {
                ...state,
                isLoading: false,
                searchResults: action.payload.results
            }

        case ActionType.LOAD_SEARCH_RESULTS_REJECTED:
            console.log('rejected');
            return {
                ...state,
                isLoading: false,
                searchResults: []
            }

        default: {
            return state;
        }
    }
};
