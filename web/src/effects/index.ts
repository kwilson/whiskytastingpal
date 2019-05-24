import { Observable } from 'rxjs';
import { filter, map, switchMap, takeUntil, catchError } from 'rxjs/operators';
import { ofType } from './utils';
import { Actions, ActionType, loadSearchResults, loadSearchResultsFulfilled, loadSearchResultsRejected, loadDetails, loadDetailsFulfilled, loadDetailsRejected, changeSearchQuery, showResult } from '../actions';
import { ajax, AjaxError } from 'rxjs/ajax';
import { ISearchResult } from '../types/search-result';
import { IDetails } from '../types/details';

export const queryChangeEffect$ = (action$: Observable<Actions>) => action$.pipe(
    ofType<ReturnType<typeof changeSearchQuery>>(ActionType.CHANGE_SEARCH_QUERY),
    filter(({ payload }) => Boolean(payload.searchQuery)),
    map(({ payload }) => loadSearchResults(payload.searchQuery))
);

export const loadSearchResultsEffect$ = (action$: Observable<Actions>) => action$.pipe(
    ofType<ReturnType<typeof loadSearchResults>>(ActionType.LOAD_SEARCH_RESULTS),
    map((action) => action.payload.searchQuery),
    switchMap(
        (searchQuery: string) => ajax.getJSON<ISearchResult[]>(`/api/search?terms=${searchQuery}`).pipe(
            map((results) => loadSearchResultsFulfilled(results)),
            takeUntil(action$.pipe(
                ofType(
                    ActionType.LOAD_SEARCH_RESULTS,
                    ActionType.CLEAR
                )
            )),
            catchError((_: AjaxError) => loadSearchResultsRejected)
        )
    )
);

export const selectResultEffect$ = (action$: Observable<Actions>) => action$.pipe(
    ofType<ReturnType<typeof showResult>>(ActionType.SHOW_RESULT),
    map(({ payload }) => loadDetails(payload.selectedResult))
);

export const loadDetailsEfect$ = (action$: Observable<Actions>) => action$.pipe(
    ofType<ReturnType<typeof loadDetails>>(ActionType.LOAD_DETAILS),
    map((action) => action.payload.selectedResult.url),
    switchMap(
        (url: string) => ajax.getJSON<IDetails>(`/api/${url}`).pipe(
            map((details) => loadDetailsFulfilled({ ...details, url })),
            takeUntil(action$.pipe(
                ofType(
                    ActionType.LOAD_DETAILS,
                    ActionType.CHANGE_SEARCH_QUERY,
                    ActionType.CLEAR
                )
            )),
            catchError((_: AjaxError) => loadDetailsRejected)
        )
    )
);
