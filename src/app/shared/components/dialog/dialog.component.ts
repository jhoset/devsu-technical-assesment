import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogService} from "../../services/dialog.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnDestroy, OnInit {
  public title: string = '';
  public body: string = '';
  public subscription!: Subscription

  constructor(private _dialogService: DialogService) {
  }

  ngOnInit() {
    this.subscription = this._dialogService.display$.subscribe(data => {
      this.title = data.title || '';
      this.body = data.body || '';

    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCancel() {
    this._dialogService.close();
  }

  onConfirm() {
    this._dialogService.confirm()
  }
}
