import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    templateUrl: './login.component.html',
    styles: [`
        em {
            font-style: italic;
            color: red;
            float: right;
        }
    `]
})
export class LoginComponent {
    username: string;
    password: string;
    loginInvalid = false;

    constructor(
        private authService: AuthService,
        private router: Router) {
    }

    login(formValues) {
        this.authService.login(formValues.userName, formValues.password)
            .subscribe(resp => {
                if (!resp) {
                    this.loginInvalid = true;
                } else {
                    this.router.navigate(['events']);
                }
            });
    }

    cancel() {
        this.router.navigate(['events']);
    }
}
