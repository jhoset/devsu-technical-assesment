import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ToastComponent} from "../../../src/app/shared/components/toast/toast.component";
import {ToastService} from "../../../src/app/shared/services/toast.service";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      imports: [BrowserDynamicTestingModule, NoopAnimationsModule],
      providers: [ToastService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  test('should create component', () => {
    expect(component).toBeTruthy();
  });

  test('should apply correct styles for success message', () => {
    toastService.display({title: 'Success', message: 'Success message', type: 'success', show: true});
    fixture.detectChanges();
    const toastElement: HTMLElement = fixture.nativeElement.querySelector('div[role="alertdialog"]');
    expect(toastElement.classList.contains('bg-[#C1ECBB]')).toBeTruthy();
  });

  test('should apply correct styles for error message', () => {
    toastService.display({title: 'Error', message: 'Error message', type: 'error', show: true});
    fixture.detectChanges();
    const toastElement: HTMLElement = fixture.nativeElement.querySelector('div[role="alertdialog"]');
    expect(toastElement.classList.contains('bg-[#ECBBBB]')).toBeTruthy();
  });
});
