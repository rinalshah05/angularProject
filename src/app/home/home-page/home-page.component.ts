import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/_services';
import { Observable } from 'rxjs';
import { Category } from '../../shared/_models/category';
import { AlertService } from '../../shared/alert/alert.service';
import { constants } from '../../../assets/constants';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  categoriesList: Category[];
  productBannerFolder:string;
  constructor(private categoryService: CategoriesService, private alertService: AlertService) { }

  ngOnInit() {
    this.productBannerFolder=constants.ProductBannerFolder;
    this.categoryService.getAllCategories().subscribe(
      res => {
        this.categoriesList = res;
      },
      error => {
        this.alertService.error(error);
      });
  }

}
