import { FullWidthComponent } from './layouts/full-width/full-width.component';
import { DefaultComponent } from './layouts/default/default.component';
import { EmployeeComponent } from './employee/employee.component';
import { CityComponent } from './city/city.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
 // {path: 'employee', component: EmployeeComponent},
  {
    path: 'employee', 
    component: DefaultComponent,
    children: [{
      path: 'employee',
      component: EmployeeComponent
    }]
  },
  {
    path: 'city', 
    component: DefaultComponent,
    children: [{
      path: '',
      component: CityComponent
    }]
  },
  {
    path: '', 
    component: FullWidthComponent,
    children: [{
      path: '',
      component: LoginComponent
    }]
  },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
