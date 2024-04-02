import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent {
    public searchText: FormControl = new FormControl<string>('')
    @Output() onSearch: EventEmitter<string> = new EventEmitter<string>()

    public onInputChange() {
        this.onSearch.emit(this.searchText.value)
    }
}
