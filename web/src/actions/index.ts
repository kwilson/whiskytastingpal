import { ISearchResult } from "../types/search-result";
import { IDetails } from "../types/details";

export interface ReduxAction {
    type: ActionType;
    payload?: any;
}

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

export const changeSearchQuery = (searchQuery: string): ReduxAction => ({
    type: ActionType.CHANGE_SEARCH_QUERY,
    payload: {
        searchQuery
    }
});

export const loadSearchResults = (searchQuery: string): ReduxAction => ({
    type: ActionType.LOAD_SEARCH_RESULTS,
    payload: {
        searchQuery
    }
});

export const loadSearchResultsFulfilled = (results: ISearchResult[]): ReduxAction => ({
    type: ActionType.LOAD_SEARCH_RESULTS_FULFILLED,
    payload: {
        results
    }
});

export const loadSearchResultsRejected = (results: ISearchResult[]): ReduxAction => ({
    type: ActionType.LOAD_SEARCH_RESULTS_REJECTED
});

export const loadDetails = (selectedResult: ISearchResult): ReduxAction => ({
    type: ActionType.LOAD_DETAILS,
    payload: {
        selectedResult
    }
});

export const loadDetailsFulfilled = (details: IDetails): ReduxAction => ({
    type: ActionType.LOAD_DETAILS_FULFILLED,
    payload: {
        results: details
    }
});

export const loadDetailsRejected = (): ReduxAction => ({
    type: ActionType.LOAD_DETAILS_REJECTED
});

export const showResult = (selectedResult: ISearchResult): ReduxAction => ({
    type: ActionType.SHOW_RESULT,
    payload: {
        selectedResult
    }
});

export const hideResult = (): ReduxAction => ({
    type: ActionType.HIDE_RESULT
});

export const clear = (): ReduxAction => ({
    type: ActionType.CLEAR
});
