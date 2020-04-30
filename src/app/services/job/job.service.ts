import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsersData {
  id: number;
  jobName: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('//localhost:8080/jobs/all');
  }

  createJob(user: UsersData){
    console.log(user.id)
    console.log(user.jobName)
    this.http.post('//localhost:8080/jobs/add', 
    {
      "id": user.id,
      "jobName": user.jobName
    })
    .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      },
      error  => {
      console.log("Error", error);
      });
  } 

  deleteJob(id:number){
    return this.http.delete(`//localhost:8080/jobs/delete/${id}`, { responseType: 'text' }).subscribe(data => {
      console.log(data);
  });
}
}
