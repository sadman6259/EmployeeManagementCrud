import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EmployeeinfoComponent } from './employeeinfo/employeeinfo.component';
 
const routes: Routes = [
  {path: 'addemployee', component:AddemployeeComponent},

  {path: 'empinfo',component: EmployeeinfoComponent},
  {path: '', component:EmployeeinfoComponent},

 









];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
