import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {ToastService} from "../../shared/services/toast.service";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const toasterService = inject(ToastService);
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          toasterService.display({
            type: 'error',
            title: 'Unauthorized Error',
            show: true,
            message: err.error
          })
        } else if (err.status === 500) {
          toasterService.display({
            type: 'error',
            title: 'Internal Server Error',
            show: true,
            message: 'Something went wrong, please notify admin'
          })
        } else {
          toasterService.display({
            type: 'error',
            title: 'Http Error',
            show: true,
            message: err.error
          })
        }
      }
      //? Re-throw the error
      return throwError(() => err)
    })
  );
};
