import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CustomButtonComponent} from "../../../src/app/shared/components/custom-button/custom-button.component";

describe('CustomButtonComponent', () => {
  let component: CustomButtonComponent;
  let fixture: ComponentFixture<CustomButtonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should render a button', () => {
    const buttonElement = compiled.querySelector('button');
    expect(buttonElement).toBeTruthy();
  })

  it('should render button with default classes', () => {
    const buttonElement = compiled.querySelector('button')!;
    expect(buttonElement.classList).toContain('text-gray-900');
  });

  it('should render button with custom  classes', () => {
    component.customClass = 'bg-red-500'
    fixture.detectChanges()
    const buttonElement = compiled.querySelector('button')!;
    expect(buttonElement.classList).toContain('bg-red-500');
  });

  it('should emit onClick event when button is clicked', () => {
    const spy = jest.spyOn(component.onClick, 'emit');
    const buttonElement = compiled.querySelector('button')!;
    buttonElement.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should disable button when disabled input is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const buttonElement = compiled.querySelector('button')!;
    expect(buttonElement.disabled).toBeTruthy();
  });

  it('should set button title when not disabled', () => {
    const expectedTitle = 'Testing';
    component.title = expectedTitle;
    component.disabled = false;
    fixture.detectChanges();
    const buttonElement = compiled.querySelector('button')!;
    expect(buttonElement.getAttribute('title')).toEqual(expectedTitle);
  });
});
