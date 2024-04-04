import {Component, DebugElement, ElementRef} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ImgFallbackDirective} from "../../../src/app/shared/directives/img-fallback.directive";

// creating a test component in the spec file
@Component(
  {
    selector: 'host-component',
    template: `<img src="url" imgFallback alt="">`
  }
)
class HostComponent {}

export class MockElementRef extends ElementRef {
  override nativeElement = {};
}

describe('ImgFallbackDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let imgDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, ImgFallbackDirective]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    imgDebugElement = fixture.debugElement.query(By.css('img'));
  });
  test('should create an instance', () => {
    const directive = new ImgFallbackDirective(imgDebugElement);
    expect(directive).toBeTruthy();
  });

  test('should set fallback image on error', () => {
    imgDebugElement.triggerEventHandler('error', null);
    fixture.detectChanges()
    const fallbackImg = imgDebugElement.nativeElement.src.split('/').at(-1);
    expect(fallbackImg).toBe('fallback.png');
  });
});
