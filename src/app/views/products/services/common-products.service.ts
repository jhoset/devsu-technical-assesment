import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProductDto} from "../../../core/services/product.service";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Injectable()
export class CommonProductsService {

    public productFormGroup!: FormGroup;

    public INITIAL_DTO_VALUE: ProductDto = {
        id: '', name: '', description: '', logo: '', date_revision: new Date(), date_release: new Date()
    }
    public productDto$: BehaviorSubject<ProductDto> = new BehaviorSubject<ProductDto>(this.INITIAL_DTO_VALUE);


    constructor() {
        this.productFormGroup = new FormGroup({
            id: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
            name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
            description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
            logo: new FormControl('', Validators.required),
            date_release: new FormControl(new Date().toISOString().split('T')[0], [Validators.required, this.releaseDateValidator]),
            date_revision: new FormControl(new Date().toISOString().split('T')[0], [Validators.required])
        });
        this.dateRevisionControl?.setValidators(this.revisionDateValidator(this.dateReleaseControl));
    }

    /* CUSTOM VALIDATORS */
    releaseDateValidator(control: AbstractControl) {
        const [year, month, day] = control.value.split('-')
        const releaseDate = new Date(year, month-1, day);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        console.log('releaseDate', releaseDate)
        console.log('current', currentDate)
        return releaseDate.getTime() >= currentDate.getTime() ? null : { invalidDate: true };
    }


    revisionDateValidator(releaseDateControl: AbstractControl): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const [year, month, day] = releaseDateControl.value.split('-')
            const releaseDate = new Date(+year + 1, month-1, day);
            const [year2, month2, day2] = control.value.split('-')
            const revisionDate = new Date(year2, month2-1, day2);
            console.log('release', releaseDate, 'revision', revisionDate)
            return revisionDate.getTime() >= releaseDate.getTime() ? null : {invalidDate: true};
        };
    }


    /* GETTERS */
    public get idControl(): FormControl {
        return this.productFormGroup.get('id') as FormControl;
    }

    public get nameControl(): FormControl {
        return this.productFormGroup.get('name') as FormControl;
    }

    public get descriptionControl(): FormControl {
        return this.productFormGroup.get('description') as FormControl;
    }

    public get logoControl(): FormControl {
        return this.productFormGroup.get('logo') as FormControl;
    }

    public get dateReleaseControl(): FormControl {
        return this.productFormGroup.get('date_release') as FormControl;
    }

    public get dateRevisionControl(): FormControl {
        return this.productFormGroup.get('date_revision') as FormControl;
    }


    public syncFormGroup() {
        if (!this.productDto$.value) return;
        this.idControl.setValue(this.productDto$.value.id);
        this.nameControl.setValue(this.productDto$.value.name);
        this.descriptionControl.setValue(this.productDto$.value.description);
        this.logoControl.setValue(this.productDto$.value.logo);
        this.dateReleaseControl.setValue(new Date(this.productDto$.value.date_release).toISOString().split('T')[0]);
        this.dateRevisionControl.setValue(new Date(this.productDto$.value.date_revision).toISOString().split('T')[0]);
    }

    public syncDto() {
        if (!this.productDto$.value) return;
        this.productDto$.value.id = this.idControl.value;
        this.productDto$.value.name = this.nameControl.value;
        this.productDto$.value.description = this.descriptionControl.value;
        this.productDto$.value.logo = this.logoControl.value;
        this.productDto$.value.date_release = this.dateReleaseControl.value;
        this.productDto$.value.date_revision = this.dateRevisionControl.value;
    }
}
