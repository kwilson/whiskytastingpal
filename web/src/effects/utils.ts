import { merge, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActionType, ReduxAction } from '../actions';

export function combineEffects<T>(...effects: Array<Observable<T>>) {
    return merge(...effects);
}

export function ofType<T extends ReduxAction = ReduxAction>(...types: T['type'][]) {
    return (source: Observable<ReduxAction>) => source.pipe(
        filter(({ type }) => types.includes(type))
    ) as Observable<T>;
}
