import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Jobs } from 'src/app/models/jobs';

@Component({
  selector: 'app-dialog-box-jobs',
  templateUrl: './dialog-box-jobs.component.html',
  styleUrls: ['./dialog-box-jobs.component.scss']
})
export class DialogBox_JobsComponent implements OnInit {

  action:string;
  local_data:any;

  constructor( public dialogRef: MatDialogRef<DialogBox_JobsComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Jobs) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action; }

  ngOnInit(): void {
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
