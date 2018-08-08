import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from './../../shared/_services/categories.service';
import { Category } from '../../shared/_models/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ModalOptions } from '../../shared/dialog/modalOptions';
import { constants } from './../../../assets/constants';
import { AlertService } from '../../shared/alert/alert.service';
const URL = constants.APIServer+'/categories';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],

})
export class CategoriesComponent implements OnInit {
  active = true;
  requestProcessing = false;
  categoryIdToUpdate = null;
  categoryForm: FormGroup;
  displayedColumns: string[] = ['Id', 'Name','Banner', 'actions'];
  dataSource: MatTableDataSource<Category>;
  categoryModalOptions: ModalOptions;
  filesToUpload: Array<File> = [];
  validation_messages = {

    'Name': [
      { type: 'maxlength', message: 'maxlength is 25' }
    ]
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.createForm();
    this.setModalOptions();
  }
  private createForm() {
    this.categoryForm = new FormGroup({
      Name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(25)
      ])),
      Files: new FormControl('', Validators.compose([
        //Validators.required
      ]))
    });
  }
  private setModalOptions() {
    this.categoryModalOptions = new ModalOptions();
    this.categoryModalOptions.modalTitle = "My Custom Modal";
    this.categoryModalOptions.message = '';
    this.categoryModalOptions.primaryButtonLabel = 'Yes';
    this.categoryModalOptions.secondaryButtonLabel = 'No';
  }

  //Perform preliminary processing configurations
  preProcessConfigurations() {

    this.requestProcessing = true;
  }
  changePopupMessage(article: Category) {
    this.categoryModalOptions.message = 'Are you sure you want to delete this category?';
    this.categoryModalOptions.data = article;
  }
  //Go back from update to create
  backToCreateCategory() {
    this.categoryIdToUpdate = null;
    this.categoryForm.reset();
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

  constructor(private categoryService: CategoriesService, private alertService: AlertService) {
    // Assign the data to the data source for the table to render
    this.showCategory();
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
}
  showCategory() {
    this.categoryService.getAllCategories().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.alertService.error(error);
      });
  }

  //Handle create and update Category
  onCategoryFormSubmit() {
    if (this.categoryForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    this.preProcessConfigurations();
    const files: Array<File> = this.filesToUpload;
    let category = this.categoryForm.value;
    category.Files=files;
    if (this.categoryIdToUpdate === null) {
      //Create category
      this.categoryService.createCategory(category)
      
        .subscribe(successCode => {

          this.alertService.success("category is created");
          this.showCategory();
          this.backToCreateCategory();
        },
          errorCode => {
            this.alertService.error(errorCode);
          }
        );
    }
    else {
      // //Handle update category
      category.Id = this.categoryIdToUpdate;
      this.categoryService.updateCategory(category)
        .subscribe((successCode) => {
          this.showCategory();
          this.backToCreateCategory();
          this.alertService.success("Category is updated");
        },
          errorCode => {
            this.alertService.error(errorCode);
          });
    }
  }
  //Load category by Id to edit
  OnLoadCategoryToEdit(categoryId: string) {
    this.preProcessConfigurations();
    this.categoryService.getCategoryById(categoryId)
      .subscribe(data => {
        var category=data[0];
        this.categoryIdToUpdate = category.Id;
        this.categoryForm.setValue({ Name: category.Name });
        this.requestProcessing = false;
      },
        errorCode => {
          this.alertService.error(errorCode);
        });
  }

  //Delete category
  OnDeleteCategory(category: Category) {
    this.preProcessConfigurations();
    this.categoryService.deleteCategoryById(category.Id.toString())
      .subscribe(successCode => {
        //this.statusCode = successCode;
        //Expecting success code 204 from server
       
        this.showCategory();
        this.backToCreateCategory();
        this.alertService.success("Data is Deleted");
      },
        errorCode => {
          this.alertService.error(errorCode);
        });
  }
}