import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './loginPages/login/login.component';
import { RegistreComponent } from './loginPages/registre/registre.component';
import { EditCategoryComponent } from './Pages/Category/edit-category/edit-category.component';
import { ListCategoriesComponent } from './Pages/Category/list-categories/list-categories.component';
import { NewCategoryComponent } from './Pages/Category/new-category/new-category.component';
import { EditProductComponent } from './Pages/Product/edit-product/edit-product.component';
import { ListProductsComponent } from './Pages/Product/list-products/list-products.component';
import { NewProductComponent } from './Pages/Product/new-product/new-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registre', component:RegistreComponent },
  { path: 'Products', component:ListProductsComponent },
  { path: 'Product/:id', component:EditProductComponent },
  { path: 'Product', component:NewProductComponent },
  { path:'Categories', component:ListCategoriesComponent },
  { path:'Category/:id', component: EditCategoryComponent },
  { path:'Category', component:NewCategoryComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
