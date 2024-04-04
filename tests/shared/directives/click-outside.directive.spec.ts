import {Component, DebugElement} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {ClickDetectorDirective} from "../../../src/app/shared/directives/click-detector.directive";
import {DomEventsHandlerService} from "../../../src/app/shared/services/dom-events-handler.service";
import {ImgFallbackDirective} from "../../../src/app/shared/directives/img-fallback.directive";


@Component({
  selector: 'host-component',
  template: `
    <div clickDetector>
      <header></header>
      <main clickOutside > </main>
    </div>`
})
class HostComponent {
}
describe('ClickOutsideDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, ImgFallbackDirective]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('main'));
  });

  test('should create an instance', () => {
    const directive = new ClickDetectorDirective(new DomEventsHandlerService());
    expect(directive).toBeTruthy();
  });
});


