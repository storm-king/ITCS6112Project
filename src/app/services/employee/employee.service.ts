import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface EmployeeData {
  employee_id: number;
   first_name: string;
   last_name: string;
   position: string;
   first_shift: boolean;
  second_shift: boolean;
    third_shift: boolean;
}

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
    console.log(employee.first_shift)
    console.log(employee.second_shift)
    console.log(employee.third_shift)
   
    this.http.post('//localhost:8080/employee/add', 
    {
      "id": employee.employee_id,
      "first_name":employee.first_name,
      "last_name": employee.last_name,
      "position": employee.position,
      "first_shift": employee.first_shift,
      "second_shift": employee.second_shift,
      "third_shift": employee.third_shift
    })
    .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      },
      error  => {
      console.log("Error", error);
      });
  } 

  
}
