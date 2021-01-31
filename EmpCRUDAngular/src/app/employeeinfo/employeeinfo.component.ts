import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EmployeeinfoService } from '../employeeinfo.service';
import { Employeeinfo } from '../employeeinfo';


@Component({
  selector: 'app-employeeinfo',
  templateUrl: './employeeinfo.component.html',
  styleUrls: ['./employeeinfo.component.css']
})
export class EmployeeinfoComponent implements OnInit {

  constructor(private service:EmployeeinfoService,private http:HttpClient,private router:Router) { }
  url = 'http://localhost:54409/api/EmployeeInfo';
  employee :any = [];  
  selectedemp : Employeeinfo[];
  ngOnInit() {
    this.getEmployee().subscribe(data => this.employee = data);

  }
  populateForm(e: Employeeinfo) 
  {
   this.service.formData = Object.assign({}, e);
   this.router.navigate(['addemployee']);

 }
  getEmployee():Observable<Employeeinfo[]>{
    return this.http.get<Employeeinfo[]>(this.url);
    
    
}
   
    onDelete(id: number) {
      if (confirm('Are you sure to delete this record?')) {
        this.service.deleteEmployee(id).subscribe(res => {
          this.getEmployee().subscribe(data =>  this.employee = data);
    
        });
      }
    }

    CheckAllOptions() {
      if (this.employee.every(val => val.selected == true))
        this.employee.forEach(val => { val.selected = false });
      else
        this.employee.forEach(val => { val.selected = true });
    }
    deleteEmpSelected(){
      this.selectedemp = this.employee.filter(_ => _.selected);
          for (var emp in this.selectedemp) {
         this.service.deleteEmployee(this.selectedemp[emp].Id)
           .subscribe(data =>{
            this.getEmployee().subscribe(data =>  this.employee = data);
          }   
           )    
        }
}

}
