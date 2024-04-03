import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsRoutingModule} from "./products-routing.module";
import {ListComponent} from './pages/list/list.component';
import {AddEditComponent} from './pages/add-edit/add-edit.component';
import {SharedModule} from "../../shared/shared.module";
import {ActionsComponent} from './components/actions/actions.component';
import {LoadingComponent} from './components/loading/loading.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchComponent } from './components/search/search.component';
import {CommonProductsService} from "./services/common-products.service";


@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent,
    ActionsComponent,
    LoadingComponent,
    PaginationComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [CommonProductsService]
})
export class ProductsModule {
}
