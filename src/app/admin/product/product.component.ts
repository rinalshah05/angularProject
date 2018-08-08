import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../shared/_services/product.service';
import { Product } from '../../shared/_models/product';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ModalOptions } from '../../shared/dialog/modalOptions';
import { AlertService } from '../../shared/alert/alert.service';
import { constants } from './../../../assets/constants';
import { CategoriesService } from '../../shared/_services/categories.service';
const URL = constants.APIServer + '/products';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],

})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Name', 'Price', 'actions'];
  dataSource: MatTableDataSource<Product>;
  productModalOptions: ModalOptions;
  productId:number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    
    this.setModalOptions();
  }
 
  private setModalOptions() {
    this.productModalOptions = new ModalOptions();
    this.productModalOptions.modalTitle = "Confirm Delete";
    this.productModalOptions.message = '';
    this.productModalOptions.primaryButtonLabel = 'Yes';
    this.productModalOptions.secondaryButtonLabel = 'No';
  }

  
  changePopupMessage(product: Product) {
    this.productModalOptions.message = 'Are you sure you want to delete this product?';
    this.productModalOptions.data = product;
  }
 

  constructor(private productService: ProductService, private categoryService: CategoriesService, private alertService: AlertService) {

    this.showProduct();
   

  }

  
  showProduct() {
    this.productService.getAllProducts().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.alertService.error(error);
      });
  }

  
  //Load product by Id to edit
  OnLoadProductToEdit(productId: number) {
   
    this.productId=productId;
    this.preProcessConfigurations();
    
  }
   //Load product by Id to edit
   AddProductImages(productId: number) {
   
    this.productId=productId;
    this.preProcessConfigurations();
    
  }
//Perform preliminary processing configurations
preProcessConfigurations() {

  //this.requestProcessing = true;
}
  //Delete product
  OnDeleteProduct(product: Product) {
    this.preProcessConfigurations();
    this.productService.deleteProductById(product.Id.toString())
      .subscribe(successCode => {
        //this.statusCode = successCode;
        //Expecting success code 204 from server

        this.showProduct();
       // this.backToCreateProduct();
        this.alertService.success("Data is Deleted");
      },
        errorCode => {
          this.alertService.error(errorCode);
        });
  }
  ShowModalForAddPopUp(){
    this.productId=0;
  }
}
