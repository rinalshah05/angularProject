import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/_services';
import { AlertService } from '../../shared/alert/alert.service';
import { Product } from '../../shared/_models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product: Product;
  colorsList: string[];
  sizeList: string[];
  color: string;
  size:string;
  constructor(private route: ActivatedRoute, public productService: ProductService, public alertService: AlertService)
  {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
    });
    this.productService.getProductById(this.id.toString()).subscribe(data => {
      this.product = data[0];
      this.colorsList = this.product.ColorsList.split(',');
      this.sizeList = this.product.SizeList.split(',');
    }
      ,
      errorCode => {
        this.alertService.error(errorCode);
      });
  }


  onColorSelectionChange(entry) {
      this.color = entry;
      console.log(entry);
  }
  onSizeSelectionChange(entry) {
    this.size = entry;
    console.log(entry);
}
}
