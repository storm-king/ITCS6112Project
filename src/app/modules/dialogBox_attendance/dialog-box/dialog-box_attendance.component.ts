import { Component, OnInit, Inject, Optional, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Attendance} from 'src/app/models/attendance';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-dialog-box_attendance',
  templateUrl: './dialog-box_attendance.component.html',
  styleUrls: ['./dialog-box_attendance.component.scss']
})
export class DialogBoxAttendanceComponent implements OnInit {

  action:string;
  local_data:any;
  id:string;
 

  constructor( public dialogRef: MatDialogRef<DialogBoxAttendanceComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Attendance) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
    this.id = this.local_data.element_id;
    console.log(this.id);
   }

  ngOnInit(): void {
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
