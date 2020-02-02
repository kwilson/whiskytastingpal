import { ISearchResult } from '../../data';

export const SEARCH = Symbol('SEARCH');
export const SEARCH_COMPLETE = Symbol('SEARCH_COMPLETE');
export const SEARCH_FAILED = Symbol('SEARCH_FAILED');
export const CLEAR_SEARCH = Symbol('CLEAR_SEARCH');

export type ActionTypes =
| ReturnType<typeof search>
| ReturnType<typeof searchComplete>
| ReturnType<typeof searchFailed>
| ReturnType<typeof clearSearch>;

export const search = (terms: string) => <const>({
    type: SEARCH,
    payload: {
        terms
    }
});

export const searchComplete = (results: ISearchResult[]) => <const>({
    type: SEARCH_COMPLETE,
    payload: {
        results
    }
});

export const searchFailed = (error: any) => <const>({
    type: SEARCH_FAILED,
    payload: {
        error
    }
});

export const clearSearch = () => <const>({
    type: CLEAR_SEARCH,
});
