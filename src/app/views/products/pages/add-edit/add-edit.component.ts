import {Component, OnInit} from '@angular/core';
import {CommonProductsService} from "../../services/common-products.service";
import {ProductService} from "../../../../core/services/product.service";
import {Router} from "@angular/router";
import {ToastService} from "../../../../shared/services/toast.service";

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html'
})
export class AddEditComponent implements OnInit {

  public loading: boolean = false;
  public submitted: boolean = false;

  public minReleaseDate = new Date();

  constructor(public _commonProductsService: CommonProductsService,
              private _productService: ProductService,
              private _router: Router,
              private _toastService: ToastService) {
    this.minReleaseDate.setHours(0, 0, 0, 0);
  }

  onSubmit() {
    this.submitted = true;
    if (this._commonProductsService.productFormGroup.invalid) return;
    this.loading = true;
    this._commonProductsService.syncDto()
    if (this._commonProductsService.case === 'CREATE') {
      this.addProduct();
    } else {
      this.updateProduct();
    }

  }

  addProduct() {
    this._productService.verifyExistingID(this._commonProductsService.productDto$.value.id).subscribe(result => {
      const errors = this._commonProductsService.idControl.errors || {}
      if (result) {
        this._commonProductsService.idControl.setErrors({...errors, existingID: true})
        this.loading = false;
        return;
      } else {
        this._commonProductsService.idControl.setErrors({...errors})
        this._commonProductsService.idControl.updateValueAndValidity();
      }
      this._productService.addProduct(this._commonProductsService.productDto$.value).subscribe(result => {
        if (result.id === this._commonProductsService.productDto$.value.id) {
          this._router.navigate(['/products']).then(rs => {
            this._toastService.display({
              title: 'Success',
              message: 'Product added successfully!',
              type: 'success'
            });
          })
        }
        this._commonProductsService.resetProductDtoAndForm();
        this.loading = false;
      })

    })
  }

  updateProduct() {
    this._productService.updateProduct(this._commonProductsService.productDto$.value).subscribe(result => {
      if (result.id === this._commonProductsService.productDto$.value.id) {
        this._router.navigate(['/products']).then(rs => {
          this._toastService.display({
            title: 'Success',
            message: 'Product updated successfully!',
            type: 'success'
          });
        })
      }
      this._commonProductsService.resetProductDtoAndForm();
      this.loading = false;
    })
  }

  onResetForm() {
    this.submitted = false;
    this._commonProductsService.resetForm();
  }

  ngOnInit() {
    if (this._commonProductsService.case === 'UPDATE') {
      this._commonProductsService.idControl.disable()
      this._commonProductsService.syncFormGroup();
    }
  }

  public get minRevisionDate() {
    const [year, month, day] = this._commonProductsService.dateReleaseControl.value.split('-')
    return new Date(+year + 1, month - 1, day);
  }

  public onChangeReleaseDate() {
    this._commonProductsService.dateRevisionControl.updateValueAndValidity();
  }

}
