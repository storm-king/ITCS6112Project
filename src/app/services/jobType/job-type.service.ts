import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsersData {
  id: number;
  typeName: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('//localhost:8080/job_types/all');
  }

  createJobType(user: UsersData){
    console.log(user.id)
    console.log(user.typeName)
    this.http.post('//localhost:8080/job_types/add', 
    {
      "id": user.id,
      "typeName": user.typeName
    })
    .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      },
      error  => {
      console.log("Error", error);
      });
  } 

  deleteJobType(id:number){
    return this.http.delete(`//localhost:8080/job_types/delete/${id}`, { responseType: 'text' }).subscribe(data => {
      console.log(data);
    }); 
  }

  updateJobType(user: UsersData){
    return this.http.post(`//localhost:8080/job_types/update/${user.id}`, user).subscribe(data => {
      console.log("POST Request is successful ", data);
    }, error => {
      console.log("Error ", error);
    });
  }

}
