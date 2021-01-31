import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employeeinfo } from '../employeeinfo';
import { EmployeeinfoService } from '../employeeinfo.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  constructor(private service:EmployeeinfoService,private http:HttpClient,private router:Router) { }
  url = 'http://localhost:54409/api/EmployeeInfo'
  public employee: any = [];  

  ngOnInit() {
    
   
  }

  resetForm(form?:NgForm){
    if (form != null)
    form.form.reset();
  this.service.formData = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    street:'',
    city:'',
    country:'',
    phone:''

  }
  this.getEmployee().subscribe(data =>  this.employee = data);

  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  generateform(employee: Employeeinfo){
    
    this.service.formData = {
      Id: employee.id,
      FirstName: employee.firstName,
      LastName: employee.lastName,
      Email: employee.email,
      Street: employee.street,
      City: employee.city,
      Country: employee.country,
      Phone: employee.phone

  
    }
  
    }
    
  getEmployee():Observable<Employeeinfo[]>{

    return this.http.get<Employeeinfo[]>(this.url);
    
    
    }
  onSubmit(form:NgForm)
  {
    console.log("onsubmit");
  
 if(form.value.Id > 0) {
   this.service.putEmployee(form.value).subscribe(
     res=>{
      this.resetForm();
      this.router.navigateByUrl('/empinfo'); 
     },
 
     err=>{ console.log('err',err)},
     
 
 
    );
 }
 else{
   this.service.postEmployee(form.value).subscribe(
     res=>{ 
      this.resetForm();
      this.router.navigateByUrl('/empinfo');  
     },
 
     err=>{ console.log('err',err)},
     
 
 
    );
 }
   
   
 
 
  }
}
