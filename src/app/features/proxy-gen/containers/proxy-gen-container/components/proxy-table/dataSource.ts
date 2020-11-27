import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';


export class DataSource<T> {

    // data to be displayed in the table
    data$: Observable<T[]>;

    // which page of the table we're on
    private _page: number = 1;

    // how many items are shown in table
    private _pageSize: number = 10;

    // Used to trigger emission of new values for table when
    // page or page size is changed
    private pageChanged = new BehaviorSubject(null);
    private pageSizeChanged = new BehaviorSubject(null);

    // Number of items in the table. Gets set when table items change.
    collectionSize: number = 0;

    constructor(dataStream$: Observable<T[]>) {
        this.data$ = combineLatest(
            dataStream$,
            this.pageChanged.asObservable(),
            this.pageSizeChanged.asObservable()
        )
        .pipe(
            map((vals) => {
                //console.log('vals in dataSource: ', vals);
                const data = vals[0];
                this.collectionSize = data.length;
                return data.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
            })
        );
    }

    get page(): number {
        return this._page;
    }

    set page(i: number) {
        this._page = i;
        this.pageChanged.next(null);
    }

    get pageSize(): number {
        return this._pageSize;
    }

    set pageSize(i: number) {
        this._pageSize = i;
        this.pageSizeChanged.next(null);
    }
}