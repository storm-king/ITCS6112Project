import { Injectable } from '@angular/core';
//By extending the HttpInterceptor class you can create a custom interceptor to catch all error 
//responses from the server in a single location. Http interceptors are added to the request pipeline 
//in the providers section of the app.module.ts file.
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';

//The Error Interceptor intercepts http responses from the api to check if there were any errors.

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            //If there is a 401 Unauthorized response the user is automatically logged out of the application
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
             //all other errors are re-thrown up to the calling service so an alert can be displayed to the user.
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}