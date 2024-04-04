import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnChanges {
    @Input() total: number = 0
    @Input() limitFormControl: FormControl = new FormControl<number>(5);
    @Output() onNext: EventEmitter<number> = new EventEmitter<number>()
    @Output() onPrev: EventEmitter<number> = new EventEmitter<number>()
    @Output() onLimitChange: EventEmitter<number> = new EventEmitter<number>()


    public currentPage: number = 1;
    public totalPages: number = 0;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['total']) {
            this.updatePagination();
        }
    }

    public updatePagination() {
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.total / this.limitFormControl.value);
    }

    public onNextPage() {
        if (this.currentPage >= this.totalPages) return;
        this.currentPage++;
        this.onNext.emit(this.currentPage)
    }

    public onPrevPage() {
        if (this.currentPage <= 1) return;
        this.currentPage--;
        this.onPrev.emit(this.currentPage)
    }

    public onChangeLimit() {
        this.updatePagination();
        this.onLimitChange.emit(+this.limitFormControl.value)
    }
}
