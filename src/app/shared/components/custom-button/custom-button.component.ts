import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'custom-button',
    templateUrl: './custom-button.component.html'
})
export class CustomButtonComponent {
    @Input() customClass: string = ''
    @Input() disabled: boolean = false;
    @Input() title: string = ''
    @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
}
