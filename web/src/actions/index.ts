import { ISearchResult } from "../types/search-result";
import { IExtendedDetails } from "../types/details";


export enum ActionType {
    CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY',

    LOAD_SEARCH_RESULTS = 'LOAD_SEARCH_RESULTS',
    LOAD_SEARCH_RESULTS_FULFILLED = 'LOAD_SEARCH_RESULTS_FULFILLED',
    LOAD_SEARCH_RESULTS_REJECTED = 'LOAD_SEARCH_RESULTS_REJECTED',

    LOAD_DETAILS = 'LOAD_DETAILS',
    LOAD_DETAILS_FULFILLED = 'LOAD_DETAILS_FULFILLED',
    LOAD_DETAILS_REJECTED = 'LOAD_DETAILS_REJECTED',

    SHOW_RESULT = 'SHOW_RESULT',
    HIDE_RESULT = 'HIDE_RESULT',

    CLEAR = 'CLEAR'
}

export const changeSearchQuery = (searchQuery: string) => (<const>{
    type: ActionType.CHANGE_SEARCH_QUERY,
    payload: {
        searchQuery
    }
});

export const loadSearchResults = (searchQuery: string) => (<const>{
    type: ActionType.LOAD_SEARCH_RESULTS,
    payload: {
        searchQuery
    }
});

export const loadSearchResultsFulfilled = (results: ISearchResult[]) => (<const>{
    type: ActionType.LOAD_SEARCH_RESULTS_FULFILLED,
    payload: {
        results
    }
});

export const loadSearchResultsRejected = (results: ISearchResult[]) => (<const>{
    type: ActionType.LOAD_SEARCH_RESULTS_REJECTED
});

export const loadDetails = (selectedResult: ISearchResult) => (<const>{
    type: ActionType.LOAD_DETAILS,
    payload: {
        selectedResult
    }
});

export const loadDetailsFulfilled = (details: IExtendedDetails) => (<const>{
    type: ActionType.LOAD_DETAILS_FULFILLED,
    payload: {
        results: details
    }
});

export const loadDetailsRejected = () => (<const>{
    type: ActionType.LOAD_DETAILS_REJECTED
});

export const showResult = (selectedResult: ISearchResult) => (<const>{
    type: ActionType.SHOW_RESULT,
    payload: {
        selectedResult
    }
});

export const hideResult = () => (<const>{
    type: ActionType.HIDE_RESULT
});

export const clear = () => (<const>{
    type: ActionType.CLEAR
});

export type Actions =
| ReturnType<typeof changeSearchQuery>
| ReturnType<typeof loadSearchResults>
| ReturnType<typeof loadSearchResultsFulfilled>
| ReturnType<typeof loadSearchResultsRejected>
| ReturnType<typeof loadDetails>
| ReturnType<typeof loadDetailsFulfilled>
| ReturnType<typeof loadDetailsRejected>
| ReturnType<typeof showResult>
| ReturnType<typeof hideResult>
| ReturnType<typeof clear>;
