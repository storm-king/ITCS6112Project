import { Component, OnInit, ComponentFactoryResolver, ViewChild, ComponentRef } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { WorkGroup} from 'src/app/models/workGroup';
import { WorkGroupService } from 'src/app/services/workGroup/work-group.service';
import { JobService } from 'src/app/services/job/job.service';
import{ ViewContainerRef} from '@angular/core';
import { NewTileComponent } from '../new-tile/new-tile.component';
import { JobTypeService } from 'src/app/services/jobType/job-type.service';
import { TransferService } from 'src/app/services/transfer/transfer.service';
import { DialogBoxEmployeeComponent } from '../dialog-box-employees/dialog-box-employees.component';
import { JobMatrix } from 'src/app/models/jobMatrix';
import { JobMatrixService } from 'src/app/services/job-matrix/job-matrix.service';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';





@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
 
  constructor(private employeeService: EmployeeService, public dialog: MatDialog,
    private datePipe: DatePipe, private workGroupService: WorkGroupService,
    private jobService: JobService, private jobMatrixService: JobMatrixService, private jobTypeService: JobTypeService,private transferService: TransferService, private resolver:ComponentFactoryResolver) { }
  
  @ViewChild('appenHere',{static:false,read: ViewContainerRef}) target: ViewContainerRef;
  @ViewChild(NewTileComponent)tile;
  private componentRef: ComponentRef<any>
  
  jobGroup;
static model;
  model = new Employee();
  employeeMatrix= new JobMatrix;
  dataRec;
  id =0;
  job_type;
  workgroups: Array<WorkGroup>;
  jobs: Array<any>;
  jobTypes: Array<any>;
  startDate;
  submitted = false;
  element;
  job_name;
  type_name; 
  jobName;
  typeName;
  add;
  jobNameShow = true;
  typeNameShow = true;
  model_job_type_name;
  model_employee_id;
  obj:Array<any>;
  workGroupName;
  alreadySubmitted = false;
  events;
  employee_id =Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1000;
  matrix_entry_id =Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1000;
   employeeSize;
   isButtonVisible = false;

   datasource: Array<any>;

  levels: Array<any>;
  primary={"id":0,"typeName":"Primary"};
  secondary={"id":1,"typeName":"Secondary"}; 
  tertiary={"id":2,"typeName":"Tertiary"}; 

 
  firstShift={"id":0,"typeName":"First Shift"};
  secondShift={"id":1,"typeName":"Second Shift"}; 
  thirdShift={"id":2,"typeName":"Third Shift"}; 
  shifts = [this.firstShift,this.secondShift,this.thirdShift];
 

  openDialog(action) {
    console.log(action);
  
    

    const dialogRef = this.dialog.open(DialogBoxEmployeeComponent, {
      width: '250px',
      
    
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }
    });
  }
  addRowData(data){
    var employeeId = 0;
    this.employeeService.getAll().subscribe((data)=>{
      this.datasource = data;
        });
    for(let i = 0; i < this.datasource.length; i++ ){
      if(employeeId < this.datasource[i].employee_id){
        employeeId = this.datasource[i].employee_id;
      }
    }
    console.log("EMPLOYEE ID");
    console.log(employeeId);
    if(this.alreadySubmitted){
      this.employeeMatrix.employee_id = employeeId;
    }
    else{
      this.employeeMatrix.employee_id = employeeId + 1;
    }
    
    this.employeeMatrix.job_knowledge = data.job_level_id;
    this.employeeMatrix.job_id = data.jobId;
    this.employeeMatrix.entry_id = this.matrix_entry_id;
   
    
    this.jobMatrixService.createJobMatrix(this.employeeMatrix);
    this.alreadySubmitted = true;
  }

  ngOnInit(): void {
     this.workGroupService.getAll().subscribe((data)=>{
      this.workgroups = data;
    })
this.jobTypeService.getAll().subscribe((data)=>{
  this.jobTypes = data;
})

this.jobService.getAll().subscribe((data)=>{
  this.jobs= data;
  console.log(data);
})
this.employeeService.getAll().subscribe((data)=>{
  this.employeeSize = data.length+1
  this.datasource = data;
    });

this.levels = [this.primary,this.secondary,this.tertiary]
    
  }

  addEvent() {
    //this.events.push(`${this.startDate}`);
   
    this.model.seniority_date = this.startDate;
    console.log(this.model.seniority_date);
  }
 
  addNewComponent(){


const factory = this.resolver.resolveComponentFactory(NewTileComponent);
const componentRef = this.target.createComponent(factory);
componentRef.instance.dataSent;
 
  }
onSubmit(){
  for(let jobType of this.jobTypes){
  if(this.model_job_type_name == jobType.typeName){
    this.model.job_type_id = jobType.id;

  }
  }
  
  this.employeeSize++;
  console.log("length: " +this.employeeSize)
  this.model.employee_id=this.employeeSize;
 console.log(this.model);
  this.employeeService.createEmployee(this.model);

 
}


}
