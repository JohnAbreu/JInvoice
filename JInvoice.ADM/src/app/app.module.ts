import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './loginPages/login/login.component';
import { RegistreComponent } from './loginPages/registre/registre.component';
import { ListProductsComponent } from './Pages/Product/list-products/list-products.component';
import { EditProductComponent } from './Pages/Product/edit-product/edit-product.component';
import { NewProductComponent } from './Pages/Product/new-product/new-product.component';
import { ListCategoriesComponent } from './Pages/Category/list-categories/list-categories.component';
import { EditCategoryComponent } from './Pages/Category/edit-category/edit-category.component';
import { NewCategoryComponent } from './Pages/Category/new-category/new-category.component';
import { SidebarComponent } from './Pages/Sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './auth/helpers/jwt.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistreComponent,
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
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
