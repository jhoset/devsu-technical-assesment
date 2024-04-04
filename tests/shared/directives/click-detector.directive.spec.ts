import {TestBed, ComponentFixture} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ClickDetectorDirective} from "../../../src/app/shared/directives/click-detector.directive";
import {DomEventsHandlerService} from "../../../src/app/shared/services/dom-events-handler.service";
import {By} from "@angular/platform-browser";

@Component({
  selector: 'host-component',
  template: `
    <div>
      <main clickDetector > </main>
    </div>`
})
class HostComponent {
}


describe('ClickDetectorDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let debugElement: DebugElement;
  let domEventsHandlerService: DomEventsHandlerService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, ClickDetectorDirective],
      providers: [
        {provide: DomEventsHandlerService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    debugElement = fixture.debugElement.query(By.css('main'));
    domEventsHandlerService = TestBed.inject(DomEventsHandlerService);
  })

  test('should create an instance', () => {
    const directive = new ClickDetectorDirective(new DomEventsHandlerService());
    expect(directive).toBeTruthy();
  });

  test('should emit clicked element when document is clicked', () => {
    const elementClickedSpy = jest.spyOn(domEventsHandlerService.elementClicked$, 'next');
    const mainElement = debugElement.nativeElement;

    mainElement.click();
    fixture.detectChanges();
    expect(elementClickedSpy.mock.calls[0][0]).toBe(mainElement);
  });
});
