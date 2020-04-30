import { Component, OnInit, Optional, Inject } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Time } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbsenceCodeService } from 'src/app/services/absenceCode/absence-code.service';


interface dialogData{
  id: number;
     employee_id:number;
    absence_date: Date;
     hours_missed: number;
     code_id: number;
}

@Component({
  selector: 'app-dialog-box-new-attendance',
  templateUrl: './dialog-box-new-attendance.component.html',
  styleUrls: ['./dialog-box-new-attendance.component.scss']
})
export class DialogBoxNewAttendanceComponent implements OnInit {
  local_data;
  action;
  id;
  absence_date;
  hourse_missed;
  code_id;
  employees;
  employee_id;
  attendanceCodes;
  
  

  constructor(public dialogRef: MatDialogRef<DialogBoxNewAttendanceComponent>,private employeeService: EmployeeService,
    private absenceCodeService: AbsenceCodeService,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: dialogData) {
    
this.employeeService.getAll().subscribe((data)=>{
this.employees = data;
});
  this.absenceCodeService.getAll().subscribe((data)=>{
this.attendanceCodes= data;
  });
  this.local_data = {...data};
  this.action = this.local_data.action;
  
 
 }


  ngOnInit(): void {
  }

  doAction(){
    
   this.local_data.employee_id = this.employee_id;
   this.local_data.code_id = this.code_id
   console.log(this.local_data)
    this.dialogRef.close({event:"Add",data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
  
  addEvent() {
    //this.events.push(`${this.startDate}`);
   
    this.local_data.absence_date = this.absence_date;
   
  }

  

}
