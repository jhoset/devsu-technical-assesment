import {Component, OnInit} from '@angular/core';
import {ProductDto, ProductService} from "../../../../core/services/product.service";
import {FormControl} from "@angular/forms";

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

    constructor(private _productService: ProductService) {
    }

    ngOnInit() {
        this.loading = true;
        this._productService.getProducts().subscribe((result: ProductDto[]) => {
            if (result) {
                this.data = result;
                this.filteredData = result;
                this.filterByPaginationState(1)
            }
            this.loading = false;
        })
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

    private filterByPaginationState(currentPage: number) {
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
