import { Reducer } from 'react';

import { ActionTypes, SEARCH, SEARCH_COMPLETE } from './actions';
import { ISearchResult } from '../../data';

export interface IState {
    results: ISearchResult[] | null;
    isLoading: boolean;
}

export const INITIAL_STATE: IState = {
    isLoading: false,
    results: null
};

export const reducer: Reducer<IState, ActionTypes> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
                results: null,
                isLoading: true
            };

        case SEARCH_COMPLETE:
            return {
                ...state,
                results: action.payload.results,
                isLoading: false
            };

        default:
            return state;
    }
};
