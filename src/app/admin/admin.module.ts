import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { SharedModule } from '../shared/shared.module';
import { AlertService } from '../shared/alert/alert.service';
import { ProductComponent } from './product/product.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddEditProductComponent } from './product/add-edit-product/add-edit-product.component';
import { ProductImageComponent } from './product/product-image/product-image.component';

const routes: Routes = [
    {
        path: '', component: CategoriesComponent
    },
    {
        path: 'categories', component: CategoriesComponent
    },
    {
        path: 'products', component: ProductComponent
    }
]


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        SharedModule

    ],
    declarations: [CategoriesComponent, ProductComponent, AddEditProductComponent, ProductImageComponent]
})
export class AdminModule { }
