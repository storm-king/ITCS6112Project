import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { GlobalConstants } from 'src/app/common/global-constants';

//The user service contains a standard set of CRUD methods for managing users, 
//it acts as the interface between the Angular application and the backend api.
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    
    getAll() {
        return this.http.get<User[]>(`${GlobalConstants.apiURL}/users`);
    }

    register(user: User) {
        return this.http.post(`${GlobalConstants.apiURL}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${GlobalConstants.apiURL}/users/${id}`);
    }
}