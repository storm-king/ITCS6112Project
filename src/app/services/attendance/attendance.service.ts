import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';



export interface AttendanceData {
  id: number;
  employee_id:number
  absence_date: Date;
  hours_missed: Time;
  code_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('//localhost:8181/attendance/all');
  }

  createAttendance(attendance: AttendanceData){
    console.log(attendance.id)
    console.log(attendance.absence_date)
    console.log(attendance.hours_missed)
    console.log(attendance.code_id)
    this.http.post('//localhost:8181/attendance/add', 
    {
      "id": attendance.id,
      "employee_id":attendance.employee_id,
      "absence_date": attendance.absence_date,
      "hourse_missed": attendance.hours_missed,
      "id_code": attendance.code_id
    })
    .subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      },
      error  => {
      console.log("Error", error);
      });
  } 

  deleteAttendance(id:number){
    return this.http.delete(`//localhost:8181/attendance/delete/${id}`, { responseType: 'text' }).subscribe(data => {
      console.log(data);
  });
}
}
