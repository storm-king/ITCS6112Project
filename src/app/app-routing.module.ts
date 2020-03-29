import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EmployeesComponent } from './modules/employees/employees.component';
import { AttendanceComponent } from './modules/attendance/attendance.component';
import { AllocateComponent } from './modules/allocate/allocate.component';
import { ReportsComponent } from './modules/reports/reports.component';
import { SetupComponent } from './modules/setup/setup.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register/register.component';

/*The app routing file defines the routes of the application, 
each route contains a path and associated component. The home 
route is secured by passing the AuthGuard to the canActivate property of the route.*/
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: '', component: DefaultComponent,canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: DashboardComponent
    },
    {
      path: 'employees',
      component: EmployeesComponent
    },
    {
      path: 'attendance',
      component: AttendanceComponent
    },
    {
      path: 'allocate',
      component: AllocateComponent
    },
    {
      path: 'reports',
      component: ReportsComponent
    },
    {
      path: 'setup',
      component: SetupComponent
    }]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
