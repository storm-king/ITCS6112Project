import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JobService } from 'src/app/services/job/job.service';
import { JobTypeService } from 'src/app/services/jobType/job-type.service';
import { JobType } from 'src/app/models/jobType';
import { Employee } from 'src/app/models/employee';
import { EmployeesComponent } from '../employees/employees.component';
import { TransferService } from 'src/app/services/transfer/transfer.service';

@Component({
  selector: 'app-new-tile',
  templateUrl: './new-tile.component.html',
  styleUrls: ['./new-tile.component.scss']
})
export class NewTileComponent implements OnInit  {
 

  constructor(private jobService: JobService,private transferService: TransferService) { }
  jobs: Array<any>
 dataSent:Array<any>;
  levels: Array<any>;
  primary={"id":0,"typeName":"Primary"};
  secondary={"id":1,"typeName":"Secondary"}; 
  tertiary={"id":2,"typeName":"Tertiary"}; 
  job_name;
  type_name; 
  
  @Output() onJobAdd: EventEmitter<any>= new EventEmitter<any>();
 
@Output() searchValue = new EventEmitter();
  ngOnInit(): void {
    this.jobService.getAll().subscribe((data)=>{
      this.jobs= data;
      console.log(data);
    })
   
  this.levels = [this.primary,this.secondary,this.tertiary]
  }


    
 addJob(){

   this.dataSent= [this.job_name,this.type_name];

this.onJobAdd.emit(this.dataSent);
console.log(this.dataSent);

  }
}
