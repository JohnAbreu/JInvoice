import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './Product/list-products/list-products.component';
import { EditProductComponent } from './Product/edit-product/edit-product.component';
import { NewProductComponent } from './Product/new-product/new-product.component';
import { ListCategoriesComponent } from './Category/list-categories/list-categories.component';
import { EditCategoryComponent } from './Category/edit-category/edit-category.component';
import { NewCategoryComponent } from './Category/new-category/new-category.component';
import { SidebarComponent } from './Sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';



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
    AppRoutingModule
  ],
  exports:[
    SidebarComponent
  ]
})
export class PagesModule { }
