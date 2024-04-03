import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ToastService} from "../../services/toast.service";
import {Subscription, take} from "rxjs";

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
export class ToastComponent implements OnInit, OnDestroy {
  @ViewChild('element', {static: false}) progressBar!: ElementRef;
  private subscription!: Subscription;
  public progressInterval!: any;

  constructor(public _toastService: ToastService) {
  }

  ngOnInit() {
    this.subscription = this._toastService.open$.subscribe((data) => {
      console.log('Data', data)
      if (data.show) {
        this.countDown();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  countDown() {
    this.progressBar.nativeElement.style.width = this._toastService.data.progressWidth;

    this.progressInterval = setInterval(() => {
      const width = parseInt(this.progressBar.nativeElement.style.width, 10);

      if (width <= 0) {
        this._toastService.hide();
        clearInterval(this.progressInterval);
        return;
      }

      this._toastService.data.progressWidth = String(width - 1);
      this.progressBar.nativeElement.style.width =
        this._toastService.data.progressWidth + '%';
    }, 50);
  }

  stopCountDown() {
    clearInterval(this.progressInterval);
  }
}
