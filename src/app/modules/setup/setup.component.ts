import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { JobTypeService } from 'src/app/services/jobType/job-type.service';
import { DialogBoxComponent } from '../dialogBox/dialog-box/dialog-box.component';
import { MatTable } from '@angular/material/table';
import { JobType } from 'src/app/models/jobType';
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
  // Job Types Setting Screen global data
  jobTypesOGdata: Array<any>;
  rankingsOGdata: Array<any>
  displayedColumns: string[] = ['name', 'action'];
  dataSource: Array<any>;
  dataSource2: Array<any>;

  // Ranking Setting Screen global data
  ranked: Array<any>;
  rankedDTO: Array<any>;
  unranked: Array<any>;
  newRankList:RankingData[] = [];

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(private rankingService: RankingService, private jobTypeService: JobTypeService, public dialog: MatDialog) {
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
    this.table.renderRows();

    var jobType = new JobType()
    jobType.id = previousId;
    jobType.typeName = row_obj.typeName;
    this.jobTypeService.createJobType(jobType);
  }

  updateRowData(row_obj){
    this.jobTypesOGdata = this.jobTypesOGdata.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.typeName = row_obj.typeName;
        var jobType = new JobType()
        jobType.id = row_obj.id;
        jobType.typeName = row_obj.typeName
        this.jobTypeService.updateJobType(value.id, jobType);
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
    for(let i = 0; i < lengthOfRanks; i++){
      //Split the string into (JobType,Knowledge Lvl)
      var splitString = this.ranked[i].split(" - ", 2);
      //Loop through jobtype data to find the job type id
      for(let j = 0; j < this.dataSource.length; j++){
        if(splitString[0] == this.dataSource[j].typeName){
          var rankData = new RankingData();
          rankData.importance = i;
          rankData.rankId = i;
          rankData.jobType = this.dataSource[j];
          
          //(1: Primary, 2: Secondary, 3: Training)
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
