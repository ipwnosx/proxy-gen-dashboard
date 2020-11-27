import { Observable } from "rxjs";


// If after a certain amout of time we don't receive a value that passes our (optional) filter,
// send a default value
export function timeoutDefault(ms: number, defaultVal: any, filterFunc?: Function) {

    return function <T>(source$: Observable<T>): Observable<T> {

        return new Observable(subscriber => {

            const timeout = setTimeout(() => {
                subscriber.next(defaultVal);
            }, ms);

            return source$.subscribe({
                next(value) {

                    if (!filterFunc) {
                        // no filter func, next the value anyways
                        clearTimeout();
                        subscriber.next(value);
                        return;
                    }

                    if(filterFunc(value)) {
                        // passed filter
                        clearTimeout(timeout);
                        subscriber.next(value);
                    }

                },
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                }
            });
        });
    }
}
