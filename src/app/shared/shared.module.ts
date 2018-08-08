import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LayoutModule } from "@angular/cdk/layout";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatTableModule, MatCardModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatSelect, MatOption, MatSelectModule, MatOptionModule } from "@angular/material";
import { NgModule } from "@angular/core";
import { DialogComponent } from "./dialog/dialog.component";
import { HttpModule } from "@angular/http";
import { FileSelectDirective } from "ng2-file-upload";
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { AuthenticationService } from "./_services";
import { AuthGuard } from "./_guards";
import { ShowErrorsComponent } from "./errors.component";
@NgModule({
    imports: [
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        LayoutModule,
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatOptionModule
       
    ],
    declarations: [
        DialogComponent,
        FileSelectDirective,
        AlertComponent,
        SidebarComponent,
        ShowErrorsComponent
    ],
    providers:[
        AlertService,
        AuthenticationService,
        AuthGuard
    ],
    exports: [
        DialogComponent,FileSelectDirective,AlertComponent,SidebarComponent,
        ShowErrorsComponent,
        HttpModule,FormsModule,ReactiveFormsModule,LayoutModule,CommonModule,
        MatToolbarModule,MatButtonModule,MatSidenavModule,MatIconModule,MatListModule,
        MatCardModule,MatTableModule,MatFormFieldModule,MatInputModule,MatPaginatorModule,
        MatSortModule,MatProgressSpinnerModule,MatSelectModule,MatOptionModule
        
        
    ]
})
export class SharedModule { }