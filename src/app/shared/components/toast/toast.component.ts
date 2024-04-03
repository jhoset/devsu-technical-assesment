import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {CustomToastService} from "../../services/custom-toast.service";

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    animations: [
        trigger('openClose', [
            state(
                'closed',
                style({
                    visibility: 'hidden',
                    right: '-400px',
                })
            ),
            state(
                'open',
                style({
                    right: '40px',
                })
            ),
            transition('open <=> closed', [animate('0.5s ease-in-out')]),
        ]),
    ],
})
export class ToastComponent implements OnInit{
    @ViewChild('element', {static: false}) progressBar!: ElementRef;
    public progressInterval!: any;

    constructor(public _customToastService: CustomToastService) {
    }

    ngOnInit() {
        this._customToastService.open$.subscribe((data) => {
            console.log('Data', data)
            if (data.show) {
                this.countDown();
            }
        });
    }

    countDown() {
        this.progressBar.nativeElement.style.width = this._customToastService.data.progressWidth;

        this.progressInterval = setInterval(() => {
            const width = parseInt(this.progressBar.nativeElement.style.width, 10);

            if (width <= 0) {
                this._customToastService.hide();
                clearInterval(this.progressInterval);
                return;
            }

            this._customToastService.data.progressWidth = String(width - 1);
            this.progressBar.nativeElement.style.width =
                this._customToastService.data.progressWidth + '%';
        }, 50);
    }

    stopCountDown() {
        clearInterval(this.progressInterval);
    }
}
