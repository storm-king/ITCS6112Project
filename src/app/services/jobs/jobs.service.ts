import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }

  deleteJob(id:number){
    return this.http.delete(`//localhost:8080/jobs/delete/${id}`, { responseType: 'text' }).subscribe(data => {
      console.log(data);
    });
  }

}

