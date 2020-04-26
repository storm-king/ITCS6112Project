import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/users/user.service';
import { User } from 'src/app/models/user';
import { JobTypeService } from 'src/app/services/jobType/job-type.service';
import { WorkGroupService } from 'src/app/services/workGroup/work-group.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  jobTypes: Array<any>;
  workGroups: Array<any>;
  currentUser: User;
  
  constructor(
    private jobTypeService: JobTypeService,
    private workGroupService: WorkGroupService,
    private authenticationService: AuthenticationService,
    private userService: UserService) { 
      this.currentUser = this.authenticationService.currentUserValue;
    }

  ngOnInit(): void {
    this.jobTypeService.getAll().subscribe((data) => {
      this.jobTypes = data;
    });
    this.workGroupService.getAll().subscribe((data) => {
      this.workGroups = data;
    });
  }

}
