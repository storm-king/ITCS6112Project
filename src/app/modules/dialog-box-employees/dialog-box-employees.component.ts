import { Component, OnInit, Inject, Optional, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee} from 'src/app/models/employee';
import {MatFormFieldModule} from '@angular/material/form-field';
import { JobMatrix } from 'src/app/models/jobMatrix';
import { JobService } from 'src/app/services/job/job.service';
import { Job } from 'src/app/models/job';

interface dialogData{
  job_name:string;
  job_id:number;
  job_level:string;
  job_level_id:number
}
@Component({
  selector: 'app-dialog-box-employees',
  templateUrl: './dialog-box-employees.component.html',
  styleUrls: ['./dialog-box-employees.component.scss']
})

export class DialogBoxEmployeeComponent implements OnInit {

  action:string;
  local_data:any;
 jobId;
 type_name:string;
 
 primary={"id":1,"typeName":"Primary"};
 secondary={"id":2,"typeName":"Secondary"}; 
 tertiary={"id":3,"typeName":"Training"}; 
 levels=[this.primary,this.secondary,this.tertiary];
jobs;
 

  constructor( public dialogRef: MatDialogRef<DialogBoxEmployeeComponent>,private jobService: JobService,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: dialogData) {
      this.jobService.getAll().subscribe((data)=>{
        this.jobs= data;
        console.log(data);
      })

    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
    this.type_name = this.local_data.element_id;
    this.jobId = this.local_data.element_id;
    console.log(this.jobId);
   
   }

  ngOnInit(): void {
  }

  doAction(){
    
    this.local_data.jobId = this.jobId;
   
    
    this.local_data.job_level = this.type_name;
    for(let level of this.levels){
      if(level.typeName ==this.local_data.job_level){
        this.local_data.job_level_id = level.id;
      }
    }
    console.log(this.local_data);
    this.dialogRef.close({event:"Add",data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
