import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService, CategoriesService } from '../../../shared/_services';
import { AlertService } from '../../../shared/alert/alert.service';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent implements OnChanges, OnInit {
  @Input()
  productId: number;

  productImageFilesToUpload: Array<File> = [];
  productImageForm: FormGroup;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

  constructor(private productService: ProductService, private categoryService: CategoriesService,
    private alertService: AlertService) { }

  ngOnInit() {
  }
  //Go back from update to create
  backToCreateProduct() {
    this.productImageForm.reset();

    this.closeAddExpenseModal.nativeElement.click();
  }
  onProductImagesFilesChangeEvent(fileInput: any) {
    this.productImageFilesToUpload = <Array<File>>fileInput.target.files;
  }
  onProductImageFormSubmit() {
    if (this.productImageForm.invalid) {
      return; //Validation failed, exit from method.
    }

    //Form is valid, now perform create or update
    //  const files: Array<File> = this.productImageFilesToUpload;
    let product = this.productImageForm.value;
    product.ProductImageFiles = this.productImageFilesToUpload;
  }
  private createForm() {
    this.productImageForm = new FormGroup({
      productImageFilesToUpload: new FormControl('', Validators.compose([
      ])),
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.productId = changes.productId.currentValue;
    if (this.productId && this.productId != 0) {
      this.productService.getProductById(this.productId.toString())
        .subscribe(data => {
          let productdata = data[0];
          this.productImageForm.setValue({
            productImageFilesToUpload:''
            // Name: productdata.Name,
            // ShortDescription: productdata.ShortDescription,
            // Price: productdata.Price,
            // ResellerPrice:productdata.ResellerPrice,
            // Description: productdata.Description,
            // ProductIconURL: productdata.ProductIconURL,
            // CategoryId: productdata.CategoryId,
            // Colors: productdata.ColorsList.split(','),
            // SizeList: productdata.SizeList.split(','),
            // Brand: productdata.Brand,
            // SuitableForList: productdata.SuitableForList.split(','),
            // Files: null
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
}
