import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable, of, Subject} from 'rxjs';
import {ListComponent} from "../../../../src/app/views/products/pages/list/list.component";
import {ProductService} from "../../../../src/app/core/services/product.service";
import {CommonProductsService} from "../../../../src/app/views/products/services/common-products.service";
import {ToastService} from "../../../../src/app/shared/services/toast.service";
import {DialogService} from "../../../../src/app/shared/services/dialog.service";
import {ActionsComponent} from "../../../../src/app/views/products/components/actions/actions.component";
import {LoadingComponent} from "../../../../src/app/views/products/components/loading/loading.component";
import {PaginationComponent} from "../../../../src/app/views/products/components/pagination/pagination.component";
import {SearchComponent} from "../../../../src/app/views/products/components/search/search.component";
import {Injectable} from "@angular/core";
import {CustomButtonComponent} from "../../../../src/app/shared/components/custom-button/custom-button.component";
import {Router} from "@angular/router";

const mockProduct = {
  id: '1',
  name: 'Product 1',
  description: 'Description 1',
  logo: '',
  date_release: '2022-01-01',
  date_revision: '2022-01-01'
}
const mockGetProducts = jest.fn().mockReturnValue(
  of([mockProduct])
);
const mockDeleteProduct = jest.fn().mockReturnValue(of('sucess'));

@Injectable({
  providedIn: 'root'
})
class mockProductService {
  public getProducts = mockGetProducts
  public deleteProduct = mockDeleteProduct
}

const mockNavigate = jest.fn();

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let commonProductsService: CommonProductsService;
  let dialogService: DialogService

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ListComponent, CustomButtonComponent, ActionsComponent, LoadingComponent, PaginationComponent, SearchComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {provide: ProductService, useClass: mockProductService},
        {provide: Router, useValue: { navigate: mockNavigate }},
        DialogService,
        CommonProductsService, ToastService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    dialogService = TestBed.inject(DialogService);
    commonProductsService = TestBed.inject(CommonProductsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should call getProducts to get data', () => {
    expect(mockGetProducts).toHaveBeenCalled()
  })

  test('should retrieved products retrieved', () => {
    expect(component.dataToDisplay).toEqual([{
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: '',
      date_release: '2022-01-01',
      date_revision: '2022-01-01'
    }]);
  });

  test('should display retrieved products in the table', () => {
    fixture.detectChanges();
    const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(tableRows.length).toBe(1);
  });

  test('should set case to UPDATE and navigate to edit route', () => {
    component.goToEditProduct(mockProduct)
    fixture.detectChanges();
    expect(commonProductsService.case).toBe('UPDATE');
    expect(commonProductsService.productDto$.value).toBe(mockProduct);
    expect(mockNavigate).toHaveBeenCalledWith(['/products/edit'])
  });

  test('should set case to CREATE and navigate to add route', () => {
    component.goToAddProduct()
    fixture.detectChanges();
    expect(commonProductsService.case).toBe('CREATE');
    expect(mockNavigate).toHaveBeenCalledWith(['/products/add'])
  });

  test('should delete product when confirmed in dialog', () => {
    const dialogServiceOpenSpy = jest.spyOn(component['_dialogService'], 'open');
    const removeDeletedItemFromDataSpy = jest.spyOn(component, 'removeDeletedItemFromData');
    component.onDeleteProduct(mockProduct);
    dialogService.dialogResponse$.next('ok')
    fixture.detectChanges()

    expect(dialogServiceOpenSpy).toHaveBeenCalledWith({
      title: 'Eliminar Producto',
      body: `¿Estas seguro de eliminar el producto: ${mockProduct.name}?`
    });
    expect(mockDeleteProduct).toHaveBeenCalledWith(mockProduct.id);
    expect(removeDeletedItemFromDataSpy).toHaveBeenCalledWith(mockProduct.id);
  });

  test('should filter data based on search text', () => {
    const searchText = 'unknown';
    component.onSearch(searchText);
    expect(component.filteredData.length).toBe(0);
  });

  test('should not filter data based on invalid search text', () => {
    const searchText = '';
    component.onSearch(searchText);
    expect(component.filteredData.length).toBe(1);
  });

  test('should remove item from data and filter data', () => {
    component.removeDeletedItemFromData(mockProduct.id);
    fixture.detectChanges();
    expect(component.data.length).toBe(0);
    expect(component.filteredData.length).toBe(0);
  });

  test('should filter data by pagination state', () => {
    component.data = [mockProduct, mockProduct, mockProduct, mockProduct, mockProduct, mockProduct];
    component.filteredData = component.data;
    const limit = component.limitFormControl.value;
    //? Note: by default is selected to display 5 records per page
    component.filterByPaginationState(1);
    fixture.detectChanges();
    expect(component.dataToDisplay.length).toBeLessThanOrEqual(limit);
  });

  test('should call filterByPaginationState with the next page number', () => {
    const nextPage = 2;
    const filterByPaginationStateSpy = jest.spyOn(component, 'filterByPaginationState');
    component.onNextPage(nextPage);
    expect(filterByPaginationStateSpy).toHaveBeenCalledWith(nextPage);
  });

  test('should call filterByPaginationState with the previous page number', () => {
    const prevPage = 1;
    const filterByPaginationStateSpy = jest.spyOn(component, 'filterByPaginationState');
    component.onPrevPage(prevPage);
    expect(filterByPaginationStateSpy).toHaveBeenCalledWith(prevPage);
  });

  test('should call filterByPaginationState when limit changes', () => {
    const newLimit = 10;
    const filterByPaginationStateSpy = jest.spyOn(component, 'filterByPaginationState');
    component.onChangeLimit(newLimit);
    expect(filterByPaginationStateSpy).toHaveBeenCalledWith(1);
  });

});
