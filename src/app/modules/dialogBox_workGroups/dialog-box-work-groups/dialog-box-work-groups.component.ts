import { Component, OnInit, Optional, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkGroup } from 'src/app/models/workGroup';

@Component({
  selector: 'app-dialog-box-work-groups',
  templateUrl: './dialog-box-work-groups.component.html',
  styleUrls: ['./dialog-box-work-groups.component.scss']
})
export class DialogBoxWorkGroupsComponent implements OnInit {

  action:string;
  local_data:any;

  constructor( public dialogRef: MatDialogRef<DialogBoxWorkGroupsComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: WorkGroup) {
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
