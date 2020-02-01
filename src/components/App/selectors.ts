import { IState } from './reducer';

export const getHasSearchResults = (state: IState) => state.results !== null;

export const getSearchResults = (state: IState) => state.results;
