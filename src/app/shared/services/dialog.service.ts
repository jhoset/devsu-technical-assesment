import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

export interface DialogData {
  title?: string;
  body?: string;
}

export type dialogResponse = 'ok' | 'cancel';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public dialogResponse$: Subject<dialogResponse> = new Subject<dialogResponse>()
  public display$: BehaviorSubject<DialogData> = new BehaviorSubject<DialogData>({})
  public showDialog: boolean = false;
  public data!: DialogData;


  public open(data: DialogData) {
    this.showDialog = true;
    this.data = data;
    this.display$.next(this.data);
    return this.dialogResponse$;
  }

  public close() {
    this.showDialog = false;
    this.dialogResponse$.next('cancel');
  }

  public confirm() {
    this.showDialog = false;
    this.dialogResponse$.next('ok');
  }
}
