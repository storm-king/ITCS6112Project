import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatDividerModule } from '@angular/material/divider';
import { EmployeesComponent } from 'src/app/modules/employees/employees.component';
import { AttendanceComponent } from 'src/app/modules/attendance/attendance.component';
import { AllocateComponent } from 'src/app/modules/allocate/allocate.component';
import { ReportsComponent } from 'src/app/modules/reports/reports.component';
import { SetupComponent } from 'src/app/modules/setup/setup.component';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    EmployeesComponent,
    AttendanceComponent,
    AllocateComponent,
    ReportsComponent,
    SetupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule
  ]
})
export class DefaultModule { }
