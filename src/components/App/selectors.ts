import { IState } from './reducer';

export const getTerms = (state: IState) => state.terms;

export const getHasSearchResults = (state: IState) => state.results !== null;

export const getSearchResults = (state: IState) => state.results;
