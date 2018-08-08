import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogComponent } from './shared/dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { AlertService } from './shared/alert/alert.service';
import {  HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{
      path:'',component:AppComponent
    }]),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
   
  ],
  providers: [AlertService],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
