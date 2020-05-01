import { Component, OnInit } from '@angular/core';
import { AllocationServiceService } from 'src/app/services/allocation/allocation-service.service';

@Component({
  selector: 'app-allocate',
  templateUrl: './allocate.component.html',
  styleUrls: ['./allocate.component.scss']
})
export class AllocateComponent implements OnInit {
  dataSource: Array<any>;
  displayedColumns: string[] = ['firstName','lastName', 'jobName'];

  constructor(private allocationService: AllocationServiceService) { }

  ngOnInit(): void {

  }

  allocate(){
    this.allocationService.getAll().subscribe((data)=>{
      this.dataSource = data;
    });
  }



}
