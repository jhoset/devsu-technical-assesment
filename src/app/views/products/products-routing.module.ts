import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListComponent} from "./pages/list/list.component";
import {AddEditComponent} from "./pages/add-edit/add-edit.component";


const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: ListComponent},
      {path: 'add', component: AddEditComponent},
      {path: 'edit', component: AddEditComponent},
      {path: '*', redirectTo: ''}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsRoutingModule {
}
