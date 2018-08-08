import { NgModule } from '@angular/core';
import { MaincontainerComponent } from './maincontainer/maincontainer.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AlertService } from '../shared/alert/alert.service';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
]


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule
    
  ],
  exports:[RouterModule],
  providers:[
    AlertService
  ],
  
  declarations: [MaincontainerComponent, HomePageComponent,ProductComponent, ProductDetailComponent]
})
export class HomeModule { }
