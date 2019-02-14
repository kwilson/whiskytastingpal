import { ISearchResult } from "../types/search-result";
import { IExtendedDetails } from "../types/details";

export interface ReduxAction {
    type: ActionType;
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

export interface IChangeSearchQueryAction extends ReduxAction {
    type: ActionType.CHANGE_SEARCH_QUERY;
    payload: {
        searchQuery: string;
    };
}

export const changeSearchQuery = (searchQuery: string): IChangeSearchQueryAction => ({
    type: ActionType.CHANGE_SEARCH_QUERY,
    payload: {
        searchQuery
    }
});

export interface ILoadSearchResultsAction extends ReduxAction {
    type: ActionType.LOAD_SEARCH_RESULTS;
    payload: {
        searchQuery: string;
    };
}

export const loadSearchResults = (searchQuery: string): ILoadSearchResultsAction => ({
    type: ActionType.LOAD_SEARCH_RESULTS,
    payload: {
        searchQuery
    }
});

export interface ILoadSearchResultsFulfilledAction extends ReduxAction {
    type: ActionType.LOAD_SEARCH_RESULTS_FULFILLED;
    payload: {
        results: ISearchResult[]
    }
}

export const loadSearchResultsFulfilled = (results: ISearchResult[]): ILoadSearchResultsFulfilledAction => ({
    type: ActionType.LOAD_SEARCH_RESULTS_FULFILLED,
    payload: {
        results
    }
});

export interface ILoadSearchResultsRejectedAction extends ReduxAction {
    type: ActionType.LOAD_SEARCH_RESULTS_REJECTED
}

export const loadSearchResultsRejected = (results: ISearchResult[]): ILoadSearchResultsRejectedAction => ({
    type: ActionType.LOAD_SEARCH_RESULTS_REJECTED
});

export interface ILoadDetailsAction extends ReduxAction {
    type: ActionType.LOAD_DETAILS;
    payload: {
        selectedResult: ISearchResult;
    };
}

export const loadDetails = (selectedResult: ISearchResult): ILoadDetailsAction => ({
    type: ActionType.LOAD_DETAILS,
    payload: {
        selectedResult
    }
});

export interface ILoadDetailsFulfilledAction extends ReduxAction {
    type: ActionType.LOAD_DETAILS_FULFILLED;
    payload: {
        results: IExtendedDetails
    };
}

export const loadDetailsFulfilled = (details: IExtendedDetails): ILoadDetailsFulfilledAction => ({
    type: ActionType.LOAD_DETAILS_FULFILLED,
    payload: {
        results: details
    }
});

export interface ILoadDetailsRejectedAction extends ReduxAction {
    type: ActionType.LOAD_DETAILS_REJECTED
}

export const loadDetailsRejected = (): ILoadDetailsRejectedAction => ({
    type: ActionType.LOAD_DETAILS_REJECTED
});

export interface IShowResultAction extends ReduxAction {
    type: ActionType.SHOW_RESULT;
    payload: {
        selectedResult: ISearchResult;
    };
}

export const showResult = (selectedResult: ISearchResult): IShowResultAction => ({
    type: ActionType.SHOW_RESULT,
    payload: {
        selectedResult
    }
});

export interface IHideResultAction extends ReduxAction {
    type: ActionType.HIDE_RESULT
}

export const hideResult = (): IHideResultAction => ({
    type: ActionType.HIDE_RESULT
});

export interface IClearAction extends ReduxAction {
    type: ActionType.CLEAR
}

export const clear = (): IClearAction => ({
    type: ActionType.CLEAR
});

export type Actions =
| IChangeSearchQueryAction
| ILoadDetailsAction
| ILoadDetailsFulfilledAction
| ILoadDetailsRejectedAction
| ILoadSearchResultsAction
| ILoadSearchResultsFulfilledAction
| ILoadSearchResultsRejectedAction
| IShowResultAction
| IHideResultAction
| IClearAction
