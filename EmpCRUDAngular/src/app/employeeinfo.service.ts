import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employeeinfo } from './employeeinfo';

@Injectable({
  providedIn: 'root'
})
export class EmployeeinfoService {
  formData ={};
  Url='http://localhost:54409/api/EmployeeInfo';

  list : Employeeinfo[];
  
    constructor(private http:HttpClient) { }
    
   
  postEmployee(formData:Employeeinfo){
  
  return this.http.post(this.Url,formData);
  }
  getEmpList(){
    return this.http.get(this.Url).toPromise();
   }
  putEmployee(formData : Employeeinfo){
    return this.http.put(this.Url+'/'+formData.Id,formData);
     
   }
  deleteEmployee(id : number){
    return this.http.delete(this.Url+'/'+id);
   }
   
  
}
