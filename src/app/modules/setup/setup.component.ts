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
import { RankingService } from 'src/app/services/ranking/ranking.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export class RankingData{
  rankId: number;
  jobType: JobType;
  knowLvl: number;
  importance: number;
}

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
  // Job Types Setting Screen global data
  jobTypesOGdata: Array<any>;
  rankingsOGdata: Array<any>
  dataSource2: Array<any>;

  // Ranking Setting Screen global data
  ranked: Array<any>;
  rankedDTO: Array<any>;
  unranked: Array<any>;
  newRankList:RankingData[] = [];

  //@ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChildren(MatTable) table !: QueryList<MatTable<string>>;

  constructor(private jobsService: JobsService, private workGroupService: WorkGroupService, private rankingService: RankingService, private jobTypeService: JobTypeService, public dialog: MatDialog) {
    this.ranked = [];
    this.unranked = [];
    this.rankedDTO = [];
   }

  ngOnInit(): void {
    this.jobTypeService.getAll().subscribe((data) => {
      this.dataSource = data;
      this.jobTypesOGdata = data;
      this.rankingsOGdata = data;
      console.log(this.dataSource);
      console.log(this.jobTypesOGdata);
      console.log(this.rankingsOGdata);    
      this.generateRankingCombinations();
    });
    this.workGroupService.getAll().subscribe((data) => {
      this.workGroups = data;
      this.dataSourseWorkGroup = data;
    });
    
    this.rankingService.getAll().subscribe((data) => {
      this.dataSource2 = data;
      console.log("This is dataSource2");
      console.log(this.dataSource2);
    })
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
    if(this.jobTypesOGdata.length > 0){
      var previousElem = this.jobTypesOGdata.pop();
      previousId = previousElem.id;
      this.jobTypesOGdata.push(previousElem);
    }
    else{
      previousId = 0;
    }

    //Increment previous Id by 1 and add new entry to the table
    previousId++;
    this.jobTypesOGdata.push({
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
        var jobType = new JobType()
        jobType.id = row_obj.id;
        jobType.typeName = row_obj.typeName
        this.jobTypeService.updateJobType(jobType);
      }
      return true;
    });

  }

  deleteRowData(row_obj){
    this.jobTypeService.deleteJobType(row_obj.id);
    this.jobTypesOGdata = this.jobTypesOGdata.filter((value,key)=>{
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
    console.log(this.currentWorkGroupSelection.workGroupName);
    if(this.currentWorkGroupSelection.jobs == null){
      this.currentWorkGroupSelection.jobs = [];
    }
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
    console.log(this.currentWorkGroupSelection);
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

  // For each JobType in the datasource, generate combinations
  generateRankingCombinations(){
      var length = this.rankingsOGdata.length;

      // For each jobtype that is present in the jobtype screen...
      for(let i = 0; i < length; i++){
        // Get current job type name and generate all possibilities (1: Primary, 2: Secondary, 3: Training)
        var jt = this.rankingsOGdata[i];
        var currentJobType = jt.typeName;
        var possibleCombinations = [1,2,3];
        var numberOfRanks = jt.ranks.length;

        // For each ranking already performed...
        for(let j = 0; j < numberOfRanks; j++){
          var rank = jt.ranks[j];
          const index = possibleCombinations.indexOf(rank.knowLvl, 0);
          
          // After getting the ranking, display in the ranked list and remove from possible combinations
          if (index > -1) {
            var removedNum = possibleCombinations.splice(index, 1).pop();
            switch(removedNum){
              case(1):
                this.ranked.push(`${currentJobType}` + " - Primary");
                break;
              case(2):
                this.ranked.push(`${currentJobType}` + " - Secondary");
                break;
              case(3):
                this.ranked.push(`${currentJobType}` + " - Training");
                break;
              default:
                this.ranked.push(`${currentJobType}` + " - ERROR");
            }
          }
        }

        //For each remaining possibility, add to the unranked list
        var lengthOfPossible = possibleCombinations.length;
        for(let k = lengthOfPossible; k > 0; k--){
          var indicator = possibleCombinations.pop();
          switch(indicator){
            case(1):
              this.unranked.push(`${currentJobType}` + " - Primary");
              break;
            case(2):
              this.unranked.push(`${currentJobType}` + " - Secondary");
              break;
            case(3):
              this.unranked.push(`${currentJobType}` + " - Training");
              break;
            default:
              this.unranked.push(`${currentJobType}` + " - ERROR");
          }
        }
      }

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  saveRanking(event){
    //Iterate through ranking list and prepare data to be updated
    var lengthOfRanks = this.ranked.length;
    var reversedRanked = [...this.ranked];
    reversedRanked = reversedRanked.reverse();

    console.log(reversedRanked);
    for(let i = 0; i < lengthOfRanks; i++){
      //Split the string into (JobType,Knowledge Lvl)
      var splitString = reversedRanked[i].split(" - ", 2);
      //Loop through jobtype data to find the job type id
      for(let j = 0; j < this.dataSource.length; j++){
        if(splitString[0] == this.dataSource[j].typeName){
          var rankData = new RankingData();
          rankData.importance = i + 1;
          rankData.rankId = i;
          rankData.jobType = this.dataSource[j];
          
          //(1: Primary, 2: Secondary, 3: Training)
          console.log(splitString[1]);
          switch(splitString[1]){
            case("Primary"):
              rankData.knowLvl = 1;
              break;
            case("Secondary"):
              rankData.knowLvl = 2;
              break;
            case("Training"):
              rankData.knowLvl = 3;
              break;
            default:
              console.log("KNOWLVL ERROR");
          }

          this.newRankList.push(rankData);
        }
      }
    }
    // Save to database
    this.rankingService.updateAll(this.newRankList);
    console.log(this.newRankList);
  }
}
