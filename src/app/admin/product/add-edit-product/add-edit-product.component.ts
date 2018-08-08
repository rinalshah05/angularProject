import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../shared/_models/category';
import { ProductService, CategoriesService } from '../../../shared/_services';
import { AlertService } from '../../../shared/alert/alert.service';
import { Product } from '../../../shared/_models/product';
import { constants } from '../../../../assets/constants';
import { Colors } from '../../../shared/_models/colors';
import { CustomValidators } from '../../../shared/_validators/CustomValidators';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnChanges, OnInit {
  @Input()
  productId: number;

  categoryList: Array<Category> = [];
  sizeList: Array<string> = [];
  suitableForList: Array<string> = [];
  colorsList: Array<Colors> = [];

 
  productBannerFileToUpload: File;
  productForm: FormGroup;
  
  ProductIconURL = "";

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  constructor(private productService: ProductService, private categoryService: CategoriesService,
    private alertService: AlertService) {

  }
  ngOnChanges(changes: SimpleChanges) {
    this.productId = changes.productId.currentValue;
    this.sizeList = constants.SizeList;
    this.suitableForList = constants.SuitableFor;
    this.colorsList = constants.ColorsList;
    this.categoryService.getAllCategories().subscribe(
      res => {
        this.categoryList = res;
      },
      error => {
        this.alertService.error(error);
      });
    if (this.productId && this.productId != 0) {
      this.productService.getProductById(this.productId.toString())
        .subscribe(data => {
          let productdata = data[0];
          this.productForm.setValue({
            Name: productdata.Name,
            ShortDescription: productdata.ShortDescription,
            Price: productdata.Price,
            ResellerPrice:productdata.ResellerPrice,
            Description: productdata.Description,
            ProductIconURL: productdata.ProductIconURL,
            CategoryId: productdata.CategoryId,
            Colors: productdata.ColorsList.split(','),
            SizeList: productdata.SizeList.split(','),
            Brand: productdata.Brand,
            SuitableForList: productdata.SuitableForList.split(','),
            Files: null
          });
        },
          errorCode => {
            this.alertService.error(errorCode);
          });
    }
    else {
      this.createForm();
    }
  }

  ngOnInit() {



  }
  private createForm() {
    this.productForm = new FormGroup({
      Name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      Description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(1000)
      ])),
      ShortDescription: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      Price: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(1000),
        CustomValidators.vaildDecimal
      ])),
      ResellerPrice: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(1000),
        CustomValidators.vaildDecimal
      ])),
      ProductIconURL: new FormControl('', Validators.compose([

      ])),
      Colors: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(1000)
      ])),
      SizeList: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(1000)
      ])),
      Brand: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(1000)
      ])),
      SuitableForList: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(1000)
      ])),
      CategoryId: new FormControl('', Validators.compose([
        Validators.required

      ])),
      productBannerFileToUpload: new FormControl('', Validators.compose([
      ])),
      productImageFilesToUpload: new FormControl('', Validators.compose([
      ]))
    });
  }

  //Go back from update to create
  backToCreateProduct() {
    this.productForm.reset();

    this.closeAddExpenseModal.nativeElement.click();
  }
  onProductBannerFileChangeEvent(fileInput: any) {
    
    if (fileInput.target.files)
    {
      this.ProductIconURL = fileInput.target.files[0]['name'];
      this.productBannerFileToUpload = <File>fileInput.target.files[0];
    }
    else
      this.ProductIconURL = "";
      console.log(this.productBannerFileToUpload);
  }
 
  //Handle create and update Product
  onProductFormSubmit() {
    if (this.productForm.invalid) {
      return; //Validation failed, exit from method.
    }

    //Form is valid, now perform create or update
  //  const files: Array<File> = this.productImageFilesToUpload;
    let product = this.productForm.value;
   // product.ProductImageFiles = this.productImageFilesToUpload;
    product.ProductBannerFile = this.productBannerFileToUpload;
    if (this.productId == 0) {
      //Create product
      this.productService.createProduct(product)
        .subscribe(successCode => {

          this.alertService.success("Product is created");
          //  this.showProduct();
          this.backToCreateProduct();

        },
          errorCode => {
            this.alertService.error(errorCode);
          }
        );
    }
    else {
      // //Handle update product
      product.Id = this.productId;
      this.productService.updateProduct(product)
        .subscribe((successCode) => {
          // this.showProduct();
          this.backToCreateProduct();
          this.alertService.success("Product is updated");
        },
          errorCode => {
            this.alertService.error(errorCode);
          });
    }
  }
}
