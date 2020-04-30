import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface EmployeeData {

   employee_id: number;
   first_name: string;
   last_name: string;
   job_type_id: number;
   seniority_date:Date;
  shift:number;
}
const options = {
  responseType: 'text' as const,
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    
    return this.http.get('//localhost:8080/employee/all');
  }
  createEmployee(employee: EmployeeData){
    console.log(employee.employee_id)
    console.log(employee.first_name)
    console.log(employee.last_name)
    console.log(employee.seniority_date)
    console.log(employee.shift)
  
   
    this.http.post('//localhost:8080/employee/add', 
    {
      "employee_id": employee.employee_id,
      "first_name":employee.first_name,
      "last_name": employee.last_name,
      "job_type_id": employee.job_type_id,
      "seniority_date":employee.seniority_date,
      "shift": employee.shift,
     
    },options)
    .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      },
      error  => {
      console.log("Error", error);
      });
  } 

  
}
