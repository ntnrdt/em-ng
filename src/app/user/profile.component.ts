
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
  styles: [`
    .error em { float: right; color: #E05C65; padding-left: 10px; }
    .error input { background-color: #E3C3C5; }
    .error ::-webkit-input-placeholder { color: #999;}
    .error ::-moz-placeholder { color: #999;}
    .error :-moz-placeholder { color: #999;}
    .error :ms-input-placeholder { color: #999;}
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {

    this.firstName = new FormControl(this.authService.currentUser.firstName,[ Validators.required, Validators.pattern('[a-zA-Z ].*')]);
    this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required);

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
      this.goHome();
    }
  }

  cancel() {
    this.goHome();
  }

  isValidFirstName() {
    return this.profileForm.controls.firstName.valid;
  }

  isValidLastName() {
    return this.profileForm.controls.lastName.valid;
  }

  private goHome() {
    this.router.navigate(['events']);
  }
}