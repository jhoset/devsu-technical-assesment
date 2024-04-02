import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ClickDetectorDirective } from './directives/click-detector.directive';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { ImgFallbackDirective } from './directives/img-fallback.directive';


@NgModule({
  declarations: [
    NavbarComponent,
    ClickOutsideDirective,
    ClickDetectorDirective,
    CustomButtonComponent,
    ImgFallbackDirective,
  ],
  exports: [
    NavbarComponent,
    ClickOutsideDirective,
    ClickDetectorDirective,
    CustomButtonComponent,
    ImgFallbackDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }