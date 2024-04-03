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
export class CustomToastService {
    public data!: ToastData;
    public open$: Subject<ToastData> = new Subject<ToastData>()

    public display(data: ToastData) {
        this.data = { ...data, show: true, progressWidth: '100%' }
        this.open$.next(this.data)
    }

    public hide() {
        this.data = { ...this.data, show: false};
        this.open$.next(this.data);
    }

}
