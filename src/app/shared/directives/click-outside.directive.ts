import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    OnDestroy,
    Output
} from '@angular/core';
import {Subscription} from "rxjs";
import {DomEventsHandlerService} from "../services/dom-events-handler.service";

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
    private subscription$: Subscription | undefined
    @Output() clickOutside: EventEmitter<void> = new EventEmitter<void>();

    constructor(private _elementRef: ElementRef,
                private _domEventsHandlerService: DomEventsHandlerService) {
    }

    ngAfterViewInit() {
        this.subscription$ = this._domEventsHandlerService.elementClicked$.subscribe(element => {
            if (!element) return;
            const clickedInside = this._elementRef.nativeElement.contains(element);
            if (!clickedInside) {
                this.clickOutside.emit();
            }
        })
    }

    ngOnDestroy() {
        this.subscription$?.unsubscribe();
    }
}
