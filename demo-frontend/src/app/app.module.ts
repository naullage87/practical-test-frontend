import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityComponent } from './city/city.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from  '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeComponent } from './employee/employee.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { LoginComponent } from './login/login.component';
import { DefaultComponent } from './layouts/default/default.component';
import { FullWidthComponent } from './layouts/full-width/full-width.component';
import { AuthInterceptor } from './login/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    EmployeeComponent,
    LoginComponent,
    DefaultComponent,
    FullWidthComponent,    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    HttpClientModule,
    MatSortModule,
    MatPaginatorModule, 
    FormsModule, 
    ReactiveFormsModule,
    AgGridModule  
   
  ],
  //providers: [],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
