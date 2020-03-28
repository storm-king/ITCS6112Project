//The app component is the root component of the application, 
//it defines the root tag of the app as <app></app> with the selector property of the @Component decorator.
import { Component } from '@angular/core';
import { Router } from '@angular/router';


import './content/app.less';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        /*It subscribes to the currentUser observable in the authentication service 
        so it can reactively show/hide the main navigation bar when the user logs in/out 
        of the application. I didn't worry about unsubscribing from the observable here because 
        it's the root component of the application, the only time the component will be destroyed 
        is when the application is closed which would destroy any subscriptions as well.*/
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    /*The app component contains a logout() method which is called from the logout link in the main 
    nav bar above to log the user out and redirect them to the login page.*/
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
