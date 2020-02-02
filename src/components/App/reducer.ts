import { Reducer } from 'react';

import { ActionTypes, SEARCH, SEARCH_COMPLETE, CLEAR_SEARCH, SEARCH_FAILED } from './actions';
import { ISearchResult } from '../../data';

export interface IState {
    terms: string | null;
    results: ISearchResult[] | null;
    isLoading: boolean;
    error: any | null;
}

export const INITIAL_STATE: IState = {
    isLoading: false,
    results: null,
    terms: null,
    error: null
};

export const reducer: Reducer<IState, ActionTypes> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
                terms: action.payload.terms,
                results: null,
                isLoading: true,
                error: null
            };

        case SEARCH_COMPLETE:
            return {
                ...state,
                results: action.payload.results,
                isLoading: false
            };

        case SEARCH_FAILED:
            return {
                ...state,
                error: action.payload.error,
                isLoading: false,
            };

        case CLEAR_SEARCH:
            return {
                ...state,
                terms: null,
                results: null,
                isLoading: false,
                error: null
            };

        default:
            return state;
    }
};
