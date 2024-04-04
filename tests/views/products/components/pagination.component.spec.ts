import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import {PaginationComponent} from "../../../../src/app/views/products/components/pagination/pagination.component";
import {CustomButtonComponent} from "../../../../src/app/shared/components/custom-button/custom-button.component";

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent, CustomButtonComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should update pagination when total changes', () => {
    component.total = 21;
    component.ngOnChanges({
      total: {currentValue: 20, previousValue: 0, firstChange: true, isFirstChange: () => true}
    });
    fixture.detectChanges()
    expect(component.currentPage).toBe(1);
    expect(component.totalPages).toBe(5);
  });

  test('should emit onNext event when Next button is clicked (btn enabled)', () => {
    component.total = 20;
    component.currentPage = 2;
    component.totalPages = 5;
    const spy = jest.spyOn(component.onNext, 'emit');
    fixture.detectChanges();
    const nextButton: HTMLButtonElement = compiled.querySelector('button[title="Siguiente"]')!;
    nextButton.click();
    expect(spy).toHaveBeenCalledWith(3);
  });

  test('should emit onPrev event when previous button is clicked (btn enabled)', () => {
    component.total = 20;
    component.currentPage = 2;
    const spy = jest.spyOn(component.onPrev, 'emit');
    fixture.detectChanges();
    const nextButton: HTMLButtonElement = compiled.querySelector('button[title="Anterior"]')!;
    nextButton.click();
    expect(spy).toHaveBeenCalledWith(1);
  });

  test('should emit onLimitChange event when limit selector is changed', () => {
    component.total = 20;
    const spy = jest.spyOn(component.onLimitChange, 'emit');
    const limitSelector = compiled.querySelector('select')!;
    limitSelector.value = '10';
    limitSelector.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith(10);
  });
});
