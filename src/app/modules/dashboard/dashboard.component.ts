import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students/students.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/users/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  students: Array<any>;
  currentUser: User;
  
  constructor(
    private studentsService: StudentsService,
    private authenticationService: AuthenticationService,
    private userService: UserService) { 
      this.currentUser = this.authenticationService.currentUserValue;
    }

  ngOnInit(): void {
    this.studentsService.getAll().subscribe((data) => {
      this.students = data;
    });
  }

}
