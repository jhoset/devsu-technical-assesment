import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {AddEditComponent} from "../../../../src/app/views/products/pages/add-edit/add-edit.component";
import {CommonProductsService} from "../../../../src/app/views/products/services/common-products.service";
import {ProductService} from "../../../../src/app/core/services/product.service";
import {ToastService} from "../../../../src/app/shared/services/toast.service";
import {CustomButtonComponent} from "../../../../src/app/shared/components/custom-button/custom-button.component";

const mockProduct = {
  id: '111',
  name: 'Product 1',
  description: 'Description 1',
  logo: 'this is a logo',
  date_release: '2025-01-01',
  date_revision: '2026-01-01'
}
const mockAddProduct = jest.fn().mockReturnValue(
  of(mockProduct)
);
const mockUpdateProduct = jest.fn().mockReturnValue(of(mockProduct));

const mockVerifyExistingID = jest.fn().mockReturnValue(of(false));
const mockProductService = {
  addProduct: mockAddProduct,
  updateProduct: mockUpdateProduct,
  verifyExistingID: mockVerifyExistingID
}
const mockNavigate = jest.fn().mockReturnValue(new Promise((resolve, reject) => {
  resolve(true)
}));
const mockDisplay = jest.fn();
describe('AddEditComponent', () => {
  let component: AddEditComponent;
  let fixture: ComponentFixture<AddEditComponent>;
  let commonProductsService: CommonProductsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditComponent, CustomButtonComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        CommonProductsService,
        {provide: ProductService, useValue: mockProductService},
        {provide: Router, useValue: {navigate: mockNavigate}},
        {provide: ToastService, useValue: {display: mockDisplay}}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditComponent);
    commonProductsService = TestBed.inject(CommonProductsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should disable id control when case is UPDATE', () => {
    commonProductsService.case = 'UPDATE';
    component.ngOnInit()
    fixture.detectChanges()
    expect(commonProductsService.idControl.disabled).toBeTruthy();
  });

  test('should not disable id control when case is CREATE', () => {
    commonProductsService.case = 'CREATE';
    expect(commonProductsService.idControl.disabled).toBeFalsy();
  });

  test('should call resetForm and update submitted flag ', () => {
    const resetFormServiceSpy = jest.spyOn(commonProductsService, 'resetForm');
    component.submitted = true;
    fixture.detectChanges();
    component.onResetForm();
    expect(component.submitted).toBeFalsy();
    expect(resetFormServiceSpy).toHaveBeenCalled()
  });

  test('should call addProduct Fn when case is CREATE', () => {
    commonProductsService.productDto$.next(mockProduct);
    commonProductsService.syncFormGroup()
    component.onSubmit();
    expect(mockVerifyExistingID).toHaveBeenCalledWith(mockProduct.id)
    expect(mockAddProduct).toHaveBeenCalled();
  });

  test('should call updateProduct Fn when case is UPDATE', () => {
    commonProductsService.case = 'UPDATE';
    commonProductsService.productDto$.next(mockProduct);
    commonProductsService.syncFormGroup()
    component.onSubmit();
    expect(mockUpdateProduct).toHaveBeenCalled();
  });

  test('should redirect after successful product addition', () => {
    commonProductsService.productDto$.next(mockProduct);
    commonProductsService.syncFormGroup()
    fixture.detectChanges();
    component.addProduct();
    expect(mockAddProduct).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(['/products'])
  });

  test('should redirect after successful update product', (done) => {
    commonProductsService.productDto$.next(mockProduct);
    commonProductsService.syncFormGroup()
    fixture.detectChanges();
    component.updateProduct();

    setTimeout(() => {
      expect(mockUpdateProduct).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith(['/products']);
      expect(mockDisplay).toHaveBeenCalledWith({
        title: 'Success',
        message: 'Product updated successfully!',
        type: 'success'
      });
      done();
    });
  });

  test('should redirect after successful product addition', (done) => {
    commonProductsService.productDto$.next(mockProduct);
    commonProductsService.syncFormGroup()
    fixture.detectChanges();
    component.addProduct();

    setTimeout(() => {
      expect(mockAddProduct).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith(['/products']);
      expect(mockDisplay).toHaveBeenCalledWith({
        title: 'Success',
        message: 'Product added successfully!',
        type: 'success'
      });
      done();
    });
  });

  test('should not call addProduct if verifyExistingID returns true', () => {
    commonProductsService.productDto$.next(mockProduct);
    commonProductsService.syncFormGroup();
    mockVerifyExistingID.mockReturnValue(of(true)); // Simulate verifyExistingID returning true
    component.addProduct();
    expect(mockAddProduct).not.toHaveBeenCalled();
  });


});
