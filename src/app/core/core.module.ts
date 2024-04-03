import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {errorInterceptor} from "./interceptors/error.interceptor";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    provideHttpClient(withInterceptors([errorInterceptor]))
  ]
})
export class CoreModule {
}
