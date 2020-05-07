import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthService {
    currentUser;

    constructor(private http: HttpClient) { }

    login(userName: string, password: string) {

        const loginInfo = {
            username: userName,
            password
        };

        return this.http.post('/api/login', loginInfo, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .pipe(tap((data: any) => {
                this.currentUser = data.user as IUser;
            }))
            .pipe(catchError(err => {
                return of(false);
            }));
    }

    logout() {
        this.currentUser = undefined;
        return this.http.post('/api/logout', {}, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
    }

    isAuthenticated() {
        return this.currentUser !== undefined;
    }

    checkAuthenticationStatus() {
        this.http.get('/api/currentIdentity')
            .pipe(tap(data => {
                if (data instanceof Object) {
                    this.currentUser = data as IUser;
                }
            }))
            .subscribe();
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;

        return this.http.put(`/api/users/${this.currentUser.id}`,
            this.currentUser,
            { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
    }
}
