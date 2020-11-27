import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { takeUntil, distinctUntilChanged, filter } from 'rxjs/operators';


// For setting values in select box form controls when using async pipe with an immutable store. 
// If option values are objects, they have an 'id' property;
export class FormSelectUpdater {

    previousValues = {};

    constructor(public fg: FormGroup, public until: Observable<any>) {}

    add<T>(controlName: string, controlOptionsList: Observable<T[]>) {

        // Subscribes to the controlOptionsList observable, and sets the control to the first item
        // in the list of items. If there was a previous value for the control, tries to 
        // set control to value that is equal to the old value. If the previous values were objects,
        // trys to find the value with the id of the previous value.
        controlOptionsList.pipe(
                distinctUntilChanged(),
                filter((val: T[]) => val.length > 0),
                takeUntil(this.until)
            )
            .subscribe((newVals: T[]) => {

                if (typeof newVals[0] === 'object') {
                    this.setFormControlForObjectTypes(controlName, newVals);
                    return;      
                }

                this.setFormControlForNonObjectTypes(controlName, newVals);
                
            });

        // Record value in this.previousValues when value changes
        this.fg.get(controlName).valueChanges
            .pipe(
                distinctUntilChanged(this.changeComparison),
                takeUntil(this.until)
            )
            .subscribe((newVal: any) => {
                this.previousValues[controlName] = newVal;
            });
    }

    // For use with distinctUntilChanged when the form control valueChanges observable.
    // Don't look at this and think you can use it for the distinctUntilChanged operator in the
    // controlOptionsList observable, as other properties on the objects may have changed, 
    // and we want the latest values.
    private changeComparison(a: any, b: any) {
        if (typeof a === 'object') {
            return a.id === b.id;
        }
        return a === b;
    }

    private setFormControlForNonObjectTypes<T>(controlName: string, newVals: T[]) {

        const previousValue = this.previousValues[controlName];

        // check for previous value in new values
        const valToSetInControl = newVals.find((p) => p === previousValue);

        if (!valToSetInControl) {
            // Previous value didn't exist in new values.
            // Set the form control to the first in the list of new values.
            this.fg.get(controlName).patchValue(newVals[0]);
            this.previousValues[controlName] = newVals[0];
            return;
        }

        // The previous value did exist in the list of new values.
        // So set form control to that.
        this.fg.get(controlName).patchValue(valToSetInControl);
    }

    // If the values we're dealing with are objects, we want to find
    // the new value for the form by checking against the id of the previous value.
    // That way the value of the form control won't appear to change to the user.
    private setFormControlForObjectTypes<T>(controlName: string, newVals: T[]) {

        const idOfPreviousObject = this.previousValues[controlName] && this.previousValues[controlName].id;

        if (idOfPreviousObject == undefined) {
            // There was no previous object, set form control to first in the list of newVals.
            this.setToFirstForObjectTypes(controlName, newVals);
            return;
        }

        // Find val where id is equal to id of previous value
        const valToSetInControl = newVals.find((nv: any) => nv.id == idOfPreviousObject);

        if (!valToSetInControl) {
            // There is no object in the list of new values with the id of the previous value.
            // Set the control to the first item in the list of new values.
            this.setToFirstForObjectTypes(controlName, newVals);
            return;
        }

        // We did find an object with an id that was equal to the id of the previous object.
        this.fg.get(controlName).patchValue(valToSetInControl);
        this.previousValues[controlName] = valToSetInControl;
        return;
    }

    private setToFirstForObjectTypes<T>(controlName: string, newVals: T[]) {
        this.fg.get(controlName).patchValue(newVals[0]);
        // set previousValue, as it has changed
        this.previousValues[controlName] = newVals[0];
    }
}

