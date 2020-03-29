import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { JobTypeService } from 'src/app/services/jobType/job-type.service';
import { DialogBoxComponent } from '../dialogBox/dialog-box/dialog-box.component';
import { MatTable } from '@angular/material/table';
import { JobType } from 'src/app/models/jobType';


@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  jobTypes: Array<any>;
  displayedColumns: string[] = ['name', 'action'];
  dataSource: Array<any>;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(private jobTypeService: JobTypeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.jobTypeService.getAll().subscribe((data) => {
      this.jobTypes = data;
      this.dataSource = data;
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
    this.table.renderRows();

    var jobType = new JobType()
    jobType.id = previousId;
    jobType.typeName = row_obj.typeName;
    this.jobTypeService.createJobType(jobType);
  }

  updateRowData(row_obj){
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

}
