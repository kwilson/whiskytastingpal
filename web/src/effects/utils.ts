import { merge, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Actions } from '../actions';

export function combineEffects<T>(...effects: Array<Observable<T>>) {
    return merge(...effects);
}

export function ofType<T extends Actions = Actions>(...types: T['type'][]) {
    return (source: Observable<Actions>) => source.pipe(
        filter(({ type }) => types.includes(type))
    ) as Observable<T>;
}
