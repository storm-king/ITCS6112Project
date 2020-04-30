import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkGroup } from 'src/app/models/workGroup';

export interface UsersData {
  id: number;
  workGroupName: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkGroupService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('//localhost:8080/work_groups/all');
  }

  createWorkGroup(user: UsersData){
    console.log(user.id)
    console.log(user.workGroupName)
    this.http.post('//localhost:8080/work_groups/add', 
    {
      "id": user.id,
      "workGroupName": user.workGroupName
    })
    .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      },
      error  => {
      console.log("Error", error);
      });
  } 

  deleteWorkGroup(id:number){
    return this.http.delete(`//localhost:8080/work_groups/delete/${id}`, { responseType: 'text' }).subscribe(data => {
      console.log(data);
    });
  }

  updateWorkGroup(wg:WorkGroup){
    return this.http.post(`//localhost:8080/work_groups/update/${wg.id}`, wg).subscribe(data => {
      console.log("POST Request is successful ", data);
    }, error => {
      console.log("Error ", error);
    });
  }

  updateWorkGroupJobs(wg:WorkGroup){
    return this.http.post(`//localhost:8080/work_groups/update_jobs/${wg.id}`, wg).subscribe(data => {
      console.log("POST Request is successful ", data);
    }, error => {
      console.log("Error ", error);
    });
  }

}
