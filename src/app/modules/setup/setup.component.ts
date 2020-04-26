import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { JobTypeService } from 'src/app/services/jobType/job-type.service';
import { WorkGroupService } from 'src/app/services/workGroup/work-group.service';
import { DialogBoxComponent } from '../dialogBox/dialog-box/dialog-box.component';
import { MatTable } from '@angular/material/table';
import { JobType } from 'src/app/models/jobType';
import { WorkGroup } from 'src/app/models/workGroup';
import { DialogBoxWorkGroupsComponent } from '../dialogBox_workGroups/dialog-box-work-groups/dialog-box-work-groups.component';
import { DialogBox_JobsComponent } from '../dialog-box-jobs/dialog-box-jobs.component';
import { JobsService } from 'src/app/services/jobs/jobs.service';


@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  jobTypes: Array<any>;
  workGroups: Array<any>;
  displayedColumns: string[] = ['name', 'action'];
  dataSource: Array<any>;
  dataSourseWorkGroup: Array<any>;
  panelOpenState = false;
  currentWorkGroupSelection: WorkGroup;

  //@ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChildren(MatTable) table !: QueryList<MatTable<string>>;

  constructor(private jobsService: JobsService, private jobTypeService: JobTypeService, private workGroupService: WorkGroupService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.jobTypeService.getAll().subscribe((data) => {
      this.jobTypes = data;
      this.dataSource = data;
    });
    this.workGroupService.getAll().subscribe((data) => {
      this.workGroups = data;
      this.dataSourseWorkGroup = data;
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
    //If not empty, get the previous Id
    var previousId;
    if(this.dataSource.length > 0){
      var previousElem = this.dataSource.pop();
      previousId = previousElem.id;
      this.dataSource.push(previousElem);
    }
    else{
      previousId = 0;
    }

    //Increment previous Id by 1 and add new entry to the table
    previousId++;
    this.dataSource.push({
      id:previousId,
      typeName:row_obj.typeName
    });
    this.table.first.renderRows();

    var jobType = new JobType()
    jobType.id = previousId;
    jobType.typeName = row_obj.typeName;
    this.jobTypeService.createJobType(jobType);
  }

  updateRowData(row_obj){
    for(let i = 0; i < this.dataSource.length; i++){
      if(this.dataSource[i].id == row_obj.id){
        this.dataSource[i].typeName = row_obj.typeName;
        this.jobTypeService.updateJobType(this.dataSource[i]);
      }
    }
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.typeName = row_obj.typeName;
        
      }
      return true;
    });

  }

  deleteRowData(row_obj){
    this.jobTypeService.deleteJobType(row_obj.id);
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

  openDialogWorkGroup(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxWorkGroupsComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowDataWorkGroup(result.data);
      }else if(result.event == 'Update'){
        this.updateRowDataWorkGroup(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowDataWorkGroup(result.data);
      }
    });
  }
 
  addRowDataWorkGroup(row_obj){
    console.log('inside addRowDataWorkGroup');
    //If not empty, get the previous Id
    var previousId;
    if(this.dataSourseWorkGroup.length > 0){
      var previousElem = this.dataSourseWorkGroup.pop();
      previousId = previousElem.id;
      this.dataSourseWorkGroup.push(previousElem);
      
    }
    else{
      previousId = 0;
    }

    //Increment previous Id by 1 and add new entry to the table
    previousId++;
    this.dataSourseWorkGroup.push({
      id:previousId,
      workGroupName:row_obj.workGroupName
    });
    this.table.forEach(el => {
      el.renderRows();
    });

    var workGroup = new WorkGroup()
    workGroup.id = previousId;
    workGroup.workGroupName = row_obj.workGroupName;
    this.workGroupService.createWorkGroup(workGroup);
    console.log(this.dataSourseWorkGroup);
  }

  updateRowDataWorkGroup(row_obj){
    var workGroupToUpdate = new WorkGroup();
    for(let i = 0; i < this.dataSourseWorkGroup.length; i++){
      if(this.dataSourseWorkGroup[i].id == row_obj.id){
        this.dataSourseWorkGroup[i].workGroupName = row_obj.workGroupName; 
        workGroupToUpdate.id = this.dataSourseWorkGroup[i].id;
        workGroupToUpdate.workGroupName = this.dataSourseWorkGroup[i].workGroupName;   
        break;
      }
    }
    this.workGroupService.updateWorkGroup(workGroupToUpdate);
  }

  deleteRowDataWorkGroup(row_obj){
    this.workGroupService.deleteWorkGroup(row_obj.id);
    this.dataSourseWorkGroup = this.dataSourseWorkGroup.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

  setWorkGroup(e){
    this.currentWorkGroupSelection = e;
  }

   openDialogJobs(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBox_JobsComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowDataJobs(result.data);
      }else if(result.event == 'Update'){
        this.updateRowDataJobs(result.data);
      }
      else if(result.event == 'Delete'){
         this.deleteRowDataJobs(result.data);
     }
    });
  }

  addRowDataJobs(row_obj){
    this.currentWorkGroupSelection.jobs.push({
      jobId: null,
      jobName:row_obj.jobName
    });
    this.table.forEach(el => {
      el.renderRows();
    });

    this.workGroupService.updateWorkGroupJobs(this.currentWorkGroupSelection);
  }

  updateRowDataJobs(row_obj){
    for(let i = 0; i < this.currentWorkGroupSelection.jobs.length; i++){
      if(this.currentWorkGroupSelection.jobs[i].jobId == row_obj.jobId){
        this.currentWorkGroupSelection.jobs[i].jobName = row_obj.jobName;
        break;
      }
    }
    this.workGroupService.updateWorkGroupJobs(this.currentWorkGroupSelection);
  }

  deleteRowDataJobs(row_obj){
    for(let i = 0; i < this.currentWorkGroupSelection.jobs.length; i++){
      if(this.currentWorkGroupSelection.jobs[i].jobId == row_obj.jobId){
        this.currentWorkGroupSelection.jobs.splice(i,1);
        break;
      }
    }

    this.table.forEach(el => {
      el.renderRows();
    });

    this.jobsService.deleteJob(row_obj.jobId);
  }

}
