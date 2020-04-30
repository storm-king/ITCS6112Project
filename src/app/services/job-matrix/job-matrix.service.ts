import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JobMatrixData {
  entry_id: number;
  employee_id;
  job_id: string;
  job_knowledge:number;
}

@Injectable({
  providedIn: 'root'
})
export class JobMatrixService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('//localhost:8080/employee_matrix/all');
  }

  createJobMatrix(jobMatrix: JobMatrixData){
    console.log(jobMatrix.entry_id)
    console.log(jobMatrix.employee_id)
    console.log(jobMatrix.job_id)
    console.log(jobMatrix.job_knowledge)
 
    this.http.post('//localhost:8080/employee_matrix/add', 
    {
      "entry_id": jobMatrix.entry_id,
      "employee_id": jobMatrix.employee_id,
      "job_id": jobMatrix.job_id,
      "job_knowledge": jobMatrix.job_knowledge
    })
    .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      },
      error  => {
      console.log("Error", error);
      });
  } 

  deleteJobMatrix(id:number){
    return this.http.delete(`//localhost:8080/employee_matrix/delete/${id}`, { responseType: 'text' }).subscribe(data => {
      console.log(data);
  });
}
}
