import {Component, OnInit} from '@angular/core';
import {ProductDto, ProductService} from "../../../../core/services/product.service";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonProductsService} from "../../services/common-products.service";
import {ToastService} from "../../../../shared/services/toast.service";
import {DialogService} from "../../../../shared/services/dialog.service";
import {take} from "rxjs";

interface TableColumn {
  name: string;
  field?: string
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  public data: ProductDto[] = []
  public filteredData: ProductDto[] = []
  public dataToDisplay: ProductDto[] = []
  public loading: boolean = false;

  public limitFormControl: FormControl = new FormControl<number>(5);

  constructor(private _productService: ProductService,
              private _router: Router,
              private _commonProductService: CommonProductsService,
              private _toastService: ToastService,
              private _dialogService: DialogService) {
    this._commonProductService.resetProductDtoAndForm();
  }

  ngOnInit() {
    this.loading = true;
    this._productService.getProducts().subscribe((result: ProductDto[]) => {
      if (result) {
        this.data = result.reverse();
        this.filteredData = result;
        this.filterByPaginationState(1)
      }
      this.loading = false;
    });

  }


  public goToEditProduct(product: ProductDto) {
    this._commonProductService.case = 'UPDATE';
    this._commonProductService.productDto$.next(product);
    this._router.navigate(['/products/edit'])
  }

  public goToAddProduct() {
    this._commonProductService.case = 'CREATE';
    this._router.navigate(['/products/add'])
  }

  public onDeleteProduct(product: ProductDto) {
    this._dialogService.open({
      title: 'Eliminar Producto',
      body: `¿Estas seguro de eliminar el producto: ${product.name}?`
    }).pipe(take(1)).subscribe(response => {
      if (response === 'ok') {
        this.loading = true;
        this._productService.deleteProduct(product.id).pipe(take(1)).subscribe(() => {
          this._toastService.display({
            title: 'Sucess',
            message: 'Product deleted successfully',
            type: 'success'
          })
          this.removeDeletedItemFromData(product.id);
          this.loading = false;
        }, error => { this.loading = false })
      }
    })
  }

  public removeDeletedItemFromData(id: string) {
    this.data = this.data.filter(product => product.id !== id);
    this.filteredData = this.data;
    this.filterByPaginationState(1)
  }


  public onSearch(text: string) {
    const searchText = text.trim().toLowerCase();
    if (searchText.length) {
      this.filteredData = this.data.filter(product => (
        (product.name.toLowerCase().includes(searchText) || product.description.toLowerCase().includes(searchText))
      ))
    } else {
      this.filteredData = this.data;
    }
    this.filterByPaginationState(1)
  }

  public filterByPaginationState(currentPage: number) {
    this.loading = true;
    const start: number = (currentPage - 1) * this.limitFormControl.value;
    const end: number = start + +(this.limitFormControl.value);
    this.dataToDisplay = this.filteredData.slice(start, end);
    this.loading = false;
  }

  public onNextPage(page: number) {
    this.filterByPaginationState(page);
  }

  public onPrevPage(page: number) {
    this.filterByPaginationState(page);
  }

  public onChangeLimit(limit: number) {
    this.filterByPaginationState(1);
  }

  public tableColumns: TableColumn[] = [
    {name: 'Logo', field: 'logo'},
    {name: 'Nombre del producto', field: 'name'},
    {name: 'Descripción', field: 'description'},
    {name: 'Fecha de liberación', field: 'date_release'},
    {name: 'Fecha de reestructuración', field: 'date_revision'},
    {name: '', field: ''},
  ];

}
