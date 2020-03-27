import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { DialogBoxComponent } from '../dialogBox_attendance/dialog-box/dialog-box_attendance.component';
import { MatTable } from '@angular/material/table';
import { Attendance } from 'src/app/models/attendance';






@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  attendance: Array<any>;
  displayedColumns: string[] = ['id','employee_id', 'hours_missed','absence_date','code_id','action'];
  dataSource: Array<any>;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(private attendanceService: AttendanceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.attendanceService.getAll().subscribe((data) => {
      this.attendance = data;
      this.dataSource = data;
    });
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
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
 
  addRowData(row_obj){

    this.dataSource.push({
      id:this.dataSource.length + 1,
      employee_id:row_obj.employee_id,
      absence_date:row_obj.absence_date,
      hours_missed:row_obj.hours_missed-19,
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
        value.employee_id= row_obj.employee_id;
        value.absence_date = row_obj.absence_date;
       value.hours_missed = row_obj.hours_missed;
        value.code_id= row_obj.code_id;
      }
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
