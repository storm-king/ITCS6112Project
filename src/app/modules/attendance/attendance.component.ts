import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { DialogBoxAttendanceComponent } from '../dialogBox_attendance/dialog-box/dialog-box_attendance.component';
import { MatTable } from '@angular/material/table';
import { Attendance } from 'src/app/models/attendance';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { DatePipe } from '@angular/common';
import { DialogBoxNewAttendanceComponent } from '../dialogBoxNewAttendance/dialog-box-new-attendance/dialog-box-new-attendance.component';






@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  
   today = new Date();
   events: string[] = [];
   hold: Date;
   count: number;
 startDate:Date;
    enableEdit = false;
  enableEditIndex = null;
  attendance: Array<any>;
  displayedColumns: string[] = ['id','employee_id', 'hours_missed','absence_date','code_id','action'];
  dataSource: Array<any>;
  savedAttendance= new Attendance();
  hoursMissed:number;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  roomsFilter: any;

  constructor(private attendanceService: AttendanceService, public dialog: MatDialog,private datePipe: DatePipe) { }

  ngOnInit(): void {
    console.log(this.today);
    
   
    this.count =0;
  }
 
  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    console.log(i, e);
  }

  openNewAttendance(action){
    const dialogRef = this.dialog.open(DialogBoxNewAttendanceComponent, {
      width: '250px',
     
    
    });


    dialogRef.afterClosed().subscribe(result => {
      
      if(result.event == 'Add'){
        this.addNewAttendanceData(result.data);
      }
    });
  }
  addNewAttendanceData(data){
    console.log(data);

this.hoursMissed = Number(data.hours_missed);

this.savedAttendance.employee_id = data.employee_id;
this.savedAttendance.hours_missed = this.hoursMissed;
this.savedAttendance.absence_date = data.absence_date;
this.savedAttendance.code_id = data.code_id;
this.attendanceService.createAttendance(this.savedAttendance);
  }

  openDialog(action,obj,element_id) {
    obj.action = action;
  obj.element_id= element_id;
    const dialogRef = this.dialog.open(DialogBoxAttendanceComponent, {
      width: '250px',
      data:obj,
    
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
       
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }
  
  

  addEvent() {
    this.events.push(`${this.startDate}`);
    
  console.log(this.events[this.count]);
  console.log(this.count);
    this.attendanceService.getTodaysAttendance(this.events[this.count]).subscribe((data) =>{
      this.attendance = data;
      this.dataSource = data;
    }
    )
  
    this.count++;
  }
 
  
  addRowData(row_obj){

    this.dataSource.push({
      id:this.dataSource.length + 1,
      employee_id:row_obj.employee_id,
      absence_date:row_obj.absence_date,
      hours_missed:row_obj.hours_missed,
      code_id:row_obj.code_id
      
    });
  console.log(row_obj.code_id);
    this.table.renderRows();
    var attendance = new Attendance()
    attendance.id = this.dataSource.length;
    attendance.employee_id= row_obj.employee_id;
    attendance.absence_date = row_obj.absence_date;
    attendance.hours_missed = row_obj.hours_missed;
    attendance.code_id= row_obj.code_id;
    this.attendanceService.createAttendance(attendance);
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.hours_missed = row_obj.hours_missed;
        value.code_id= row_obj.code_id;
        console.log(row_obj);
       
        this.attendanceService.updateAttendance(row_obj);
       
      }
      this.table.renderRows();
      return true;
    });
  }
  deleteRowData(row_obj){
    this.attendanceService.deleteAttendance(row_obj.id);
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

}
