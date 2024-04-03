import {Directive, HostListener} from '@angular/core';
import {DomEventsHandlerService} from "../services/dom-events-handler.service";

@Directive({
    selector: '[clickDetector]'
})
export class ClickDetectorDirective {

    constructor(
        private _domEventsHandlerService: DomEventsHandlerService) {
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement: HTMLElement) {
        this._domEventsHandlerService.elementClicked$.next(targetElement);
    }
}
