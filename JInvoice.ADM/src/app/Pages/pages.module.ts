import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule} from '@angular/common';
import { ListProductsComponent } from './Product/list-products/list-products.component';
import { EditProductComponent } from './Product/edit-product/edit-product.component';
import { NewProductComponent } from './Product/new-product/new-product.component';
import { ListCategoriesComponent } from './Category/list-categories/list-categories.component';
import { EditCategoryComponent } from './Category/edit-category/edit-category.component';
import { NewCategoryComponent } from './Category/new-category/new-category.component';
import { SidebarComponent } from './Sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListProductsComponent,
    EditProductComponent,
    NewProductComponent,
    ListCategoriesComponent,
    EditCategoryComponent,
    NewCategoryComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports:[
    SidebarComponent
  ]
})
export class PagesModule { }
