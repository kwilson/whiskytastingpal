import { merge, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActionType, ReduxAction } from '../reducers';

export function combineEffects<T>(...effects: Array<Observable<T>>) {
    return merge(...effects);
}

export function ofType(...types: ActionType[]) {
    return (action: Observable<ReduxAction>) => action.pipe(
        filter((x) => types.includes(x.type))
    );
}
