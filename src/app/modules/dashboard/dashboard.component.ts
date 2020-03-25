import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/users/user.service';
import { User } from 'src/app/models/user';
import { JobTypeService } from 'src/app/services/jobType/job-type.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  jobTypes: Array<any>;
  currentUser: User;
  
  constructor(
    private jobTypeService: JobTypeService,
    private authenticationService: AuthenticationService,
    private userService: UserService) { 
      this.currentUser = this.authenticationService.currentUserValue;
    }

  ngOnInit(): void {
    this.jobTypeService.getAll().subscribe((data) => {
      this.jobTypes = data;
    });
  }

}
