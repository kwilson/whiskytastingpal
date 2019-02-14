import { ISearchResult } from '../types/search-result';
import { IExtendedDetails } from '../types/details';
import { ActionType, Actions } from '../actions';

export interface ReduxState {
    searchQuery: string;
    searchResults: ISearchResult[];
    details: IExtendedDetails | null;
    isLoading: boolean;
}

export const INITIAL_STATE: ReduxState = {
    searchQuery: '',
    searchResults: [],
    details: null,
    isLoading: false
};

export const reducer = (state = INITIAL_STATE, action: Actions): ReduxState => {
    switch (action.type) {
        case ActionType.CHANGE_SEARCH_QUERY:
            const searchQuery = action.payload.searchQuery;
            return {
                ...state,
                searchQuery,
                searchResults: []
            };

        case ActionType.LOAD_SEARCH_RESULTS:
        case ActionType.LOAD_DETAILS:
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
            return {
                ...state,
                isLoading: false,
                searchResults: []
            }

        case ActionType.LOAD_DETAILS_FULFILLED:
            return {
                ...state,
                isLoading: false,
                details: action.payload.results
            };

        case ActionType.LOAD_DETAILS_REJECTED:
            return {
                ...state,
                isLoading: false,
                details: null
            };

        case ActionType.HIDE_RESULT:
            return {
                ...state,
                details: null
            };

        case ActionType.CLEAR:
            return INITIAL_STATE;

        default: {
            return state;
        }
    }
};
