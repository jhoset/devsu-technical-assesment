import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DomEventsHandlerService {

    public elementClicked$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
}
