import {Component, OnInit} from '@angular/core';
import {CommonProductsService} from "../../services/common-products.service";
import {ProductService} from "../../../../core/services/product.service";
import {Router} from "@angular/router";
import {CustomToastService} from "../../../../shared/services/custom-toast.service";

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html'
})
export class AddEditComponent implements OnInit {

    public submitted = false;

    public minReleaseDate = new Date();

    constructor(public _commonProductsService: CommonProductsService,
                private _productService: ProductService,
                private _router: Router,
                private _customToastService: CustomToastService) {
        this.minReleaseDate.setHours(0, 0, 0, 0);
    }

    onSubmit() {
        this.submitted = true;
        if (this._commonProductsService.productFormGroup.invalid) return;
        this._commonProductsService.syncDto()
        this._productService.verifyExistingID(this._commonProductsService.productDto$.value.id).subscribe(result => {
            const errors = this._commonProductsService.idControl.errors || {}
            if (result) {
                this._customToastService.display({
                    title: '¡Error!',
                    message: `ID = ${this._commonProductsService.productDto$.value.id} ya se encuentra en uso.`,
                    type: 'error'
                });
                this._commonProductsService.idControl.setErrors({...errors, existingID: true})
            } else {
                this._commonProductsService.idControl.setErrors({...errors})
                this._commonProductsService.idControl.updateValueAndValidity();
            }

            this._productService.addProduct(this._commonProductsService.productDto$.value).subscribe(result => {
                if (result.id === this._commonProductsService.productDto$.value.id) {
                    this._router.navigate(['/products']).then(rs => {
                        this._customToastService.display({
                            title: '¡Exito!',
                            message: 'Item Agregado correctamente!',
                            type: 'success'
                        });
                    })
                }
            })

        })
    }

    ngOnInit() {
        if (+this._commonProductsService.productDto$.value.id) {
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
