import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DialogComponent} from "../../../src/app/shared/components/dialog/dialog.component";
import {DialogService} from "../../../src/app/shared/services/dialog.service";
import {CustomButtonComponent} from "../../../src/app/shared/components/custom-button/custom-button.component";

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogService: DialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent, CustomButtonComponent],
      providers: [DialogService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    dialogService = TestBed.inject(DialogService);
    fixture.detectChanges();
  });

  test('should create component', () => {
    expect(component).toBeTruthy();
  });

  test('should display dialog content correctly', () => {
    const testData = {title: 'Test Title', body: 'Test Body'};
    dialogService.open(testData);
    fixture.detectChanges();

    const headerElement: HTMLElement = fixture.nativeElement.querySelector('header');
    const bodyElement: HTMLElement = fixture.nativeElement.querySelector('main');
    const footerElement: HTMLElement = fixture.nativeElement.querySelector('footer');

    expect(headerElement).toBeTruthy();
    expect(bodyElement).toBeTruthy();
    expect(footerElement).toBeTruthy()
  });

  test('should call onCancel when CANCELAR button is clicked', () => {
    const cancelSpy = jest.spyOn(component, 'onCancel');
    const cancelButton: HTMLButtonElement = fixture.nativeElement
      .querySelector('custom-button[aria-label="cancel"]')
      .querySelector('button');
    cancelButton.click()
    expect(cancelSpy).toHaveBeenCalled();
  });

  test('should call onConfirm when CONFIRM button is called', () => {
    const confirmSpy = jest.spyOn(component, 'onConfirm');
    const cancelButton: HTMLButtonElement = fixture.nativeElement
      .querySelector('custom-button[aria-label="confirm"]')
      .querySelector('button');
    cancelButton.click()
    expect(confirmSpy).toHaveBeenCalled();
  });
});
