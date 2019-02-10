import { merge, Observable } from 'rxjs';
import { ReduxAction, ActionType } from '../../reducers';
import { filter } from 'rxjs/operators';

export function combineEffects<T>(...effects: Array<Observable<T>>) {
    return merge(...effects);
}

export function ofType(type: ActionType) {
    return (action: Observable<ReduxAction>) => action.pipe(
        filter((x) => x.type === type)
    );
}
