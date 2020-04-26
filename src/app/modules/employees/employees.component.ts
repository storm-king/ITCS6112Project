import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  constructor(private employeeService: EmployeeService, public dialog: MatDialog,private datePipe: DatePipe) { }
  model = new Employee();
  id =0;
  workgroups = ['Materials','Docks', 'Assembly']
  submitted = false;
  onSubmit(){
   
    this.employeeService.createEmployee(this.model)}

  

  ngOnInit(): void {
  }

}
