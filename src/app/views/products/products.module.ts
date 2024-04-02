import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsRoutingModule} from "./products-routing.module";
import {ListComponent} from './pages/list/list.component';
import {AddEditComponent} from './pages/add-edit/add-edit.component';


@NgModule({
  declarations: [
    ListComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule {
}
