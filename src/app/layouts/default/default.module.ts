import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule} from '@angular/material/input'
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button';
import { DialogBoxComponent } from 'src/app/modules/dialogBox/dialog-box/dialog-box.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DialogBoxAttendanceComponent } from 'src/app/modules/dialogBox_attendance/dialog-box/dialog-box_attendance.component';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    EmployeesComponent,
    AttendanceComponent,
    AllocateComponent,
    ReportsComponent,
    SetupComponent,
    DialogBoxComponent,
    AttendanceComponent,
    DialogBoxAttendanceComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
  ],
  providers: [DatePipe],
  
  entryComponents: [
    DialogBoxComponent
  ]
})
export class DefaultModule { }
