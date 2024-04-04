import {Injectable} from '@angular/core';
import {Subject} from "rxjs";


export type toastType = 'error' | 'success'

export interface ToastData {
    title: string;
    message: string;
    show?: boolean;
    type: toastType,
    progressWidth?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    public data!: ToastData;
    public state$: Subject<ToastData> = new Subject<ToastData>()

    public display(data: ToastData) {
        this.data = { ...data, show: true, progressWidth: '100%' }
        this.state$.next(this.data)
    }

    public hide() {
        this.data = { ...this.data, progressWidth: '0%', show: false};
        this.state$.next(this.data);
    }

}
