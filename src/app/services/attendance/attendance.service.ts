import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';
import { Attendance } from 'src/app/models/attendance';



export interface AttendanceData {
  id: number;
  employee_id:number
  absence_date: Date;
  hours_missed: number;
  code_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    
    return this.http.get('//localhost:8080/attendance/all');
  }
  getTodaysAttendance(date:string): Observable<any> {
    
    return this.http.get('//localhost:8080/attendance/today',{params:{date}});
  }

  createAttendance(attendance: AttendanceData){
    console.log(attendance.id)
    console.log(attendance.absence_date)
    console.log(attendance.hours_missed)
    console.log(attendance.code_id)
    this.http.post('//localhost:8080/attendance/add', 
    {
      "id": attendance.id,
      "employee_id":attendance.employee_id,
      "absence_date": attendance.absence_date,
      "hours_missed": attendance.hours_missed,
      "code_id": attendance.code_id
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
    return this.http.delete(`//localhost:8080/attendance/delete/${id}`, { responseType: 'text' }).subscribe(data => {
      console.log(data);
  });
 
}
updateAttendance(attendance:Attendance){
  return this.http.post('//localhost:8080/attendance/update',attendance, {responseType: 'text'}).subscribe(data =>{
   
      console.log("POST Request is successful ", data);
      },
      error  => {
      console.log("Error", error);
      
  });
}
}
