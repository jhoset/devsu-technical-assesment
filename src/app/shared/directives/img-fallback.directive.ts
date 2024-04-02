import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
    selector: 'img[imgFallback]'
})
export class ImgFallbackDirective {

    @Input() imageFallback: string = '../../../assets/fallback.png';

    constructor(private _elementRef: ElementRef) {
    }

    @HostListener('error')
    handleImgErrorEvent() {
        const element: HTMLImageElement = this._elementRef.nativeElement
        element.src = this.imageFallback;
    }

}
