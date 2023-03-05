import { NgOptimizedImage } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/service';
import { HttpService } from 'app/httpServices/http.service';
import { APIResponse } from 'app/models/ApiResponse/ApiResponse.model';
import { Category } from 'app/models/Catalog/category.model';
import { Product } from 'app/models/Catalog/product.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  private userLog = "";
  public product:Product;
  public Categories: Category[];
  public productDetailsForm: UntypedFormGroup;
  public loading: boolean = false;
  public isSubmitted: boolean = false;
  public Required: boolean =false;

  public img: string;
  public archivos: any = []
  constructor(private router: Router,
    private http: HttpService, 
    private authUser: AuthenticationService,
    private route: Router,
    private formBuilder: UntypedFormBuilder,
    private sanitizer: DomSanitizer,
    private httpClient:HttpClient) { }

  ngOnInit(): void {
    if(this.authUser.isAuthenticated === false) this.route.navigate(['/login']);
    this.loadCategories();
    this.product = this.newProduct(this.product);
    this.productDetailsForm = this.formBuilder.group({
      name: ['',Validators.required],
      selectCategory: ['', Validators.required],
      description: [''],
      onHand: [false],
      price: [0.00]
    });
  }

  loadCategories() {
    this.http.loadPararms();
    this.http.GetAll<APIResponse<Category[]>>('category')
    .subscribe((resp) => {
      this.Categories = resp.result;
    },
    (error) => console.log(error));
  }

  newProduct(product : Product):Product{
   return product =  {
    productID :0,
    categoryID:0,
    name:'',
    description: '',
    price:0.00,
    createdBy: this.userLog,
    isActive: true,
    createdOn: new Date,
    onHand:0,
    }
  }
  public get getProductFormData() {
    return this.productDetailsForm.controls;
  }
  setFormDataToModel(){
    this.product.name = this.productDetailsForm.controls['name'].value; 
    this.product.categoryID = this.productDetailsForm.controls['selectCategory'].value; 
    this.product.description = this.productDetailsForm.controls['description'].value; 
     if(this.productDetailsForm.controls['onHand'].value == true) this.product.onHand = 1;
     else this.product.onHand = 0;
    this.product.price = this.productDetailsForm.controls['price'].value; 
    //this.authUser.currentUser.subscribe( ({userID}) => this.userLog = userID);
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.product.createdBy = user.userID;
    console.log(`obtejo productos`, this.product)
  }
  onFileSelected(event:any) {
    const archivo = event.target.files[0]
    this.extraerBase64(archivo).then((imagen: any) => {
      this.img = imagen.base;
      console.log(imagen);
  });
  this.archivos.push(archivo);
}
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  });
  subirArchivo(): any {
    this.loading = true;
    const formData = new FormData();
    this.archivos.forEach(archivo => {
      formData.append('files', archivo)
    })
    this.httpClient.post(`${environment}/upload`, formData)
      .subscribe(res => {
        this.loading = false;
        console.log('Respuesta del servidor', res);
      }, 
      (error) => console.log(error)
      );
  }

  OnSubmitForm() {
  

    this.isSubmitted = true;
    this.loading = true;
    if (this.productDetailsForm.invalid) {
      this.Required =true;
      return;
    }else this.Required =false;
    this.setFormDataToModel();
    //enviar files img  
    const formData = new FormData();
    this.archivos.forEach(archivo => {
      formData.append('files', archivo)
    })

    this.http.Post('products', this.product,)
      .subscribe((resp) => {
        console.log(resp);
        this.loading = false;
        this.router.navigate(['/Products']);
      },
      (error) => console.log(error)
      );
    }

}
