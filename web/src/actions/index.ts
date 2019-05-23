import keymirror from 'keymirror';
import { ISearchResult } from "../types/search-result";
import { IExtendedDetails } from "../types/details";

export const ActionType = keymirror({
    CHANGE_SEARCH_QUERY: null,

    LOAD_SEARCH_RESULTS: null,
    LOAD_SEARCH_RESULTS_FULFILLED: null,
    LOAD_SEARCH_RESULTS_REJECTED: null,

    LOAD_DETAILS: null,
    LOAD_DETAILS_FULFILLED: null,
    LOAD_DETAILS_REJECTED: null,

    SHOW_RESULT: null,
    HIDE_RESULT: null,

    CLEAR: null,
});

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
