import { Component, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLogin } from 'src/app/models/user-login';
import { UserService } from 'src/app/services/user.service';
import { CustomValidation } from 'src/app/validations/customValidations.validator';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
  constructor(private signupService: UserService) {}
  isuserLoggedIn: boolean = true;
  registerForm!: FormGroup;

  onLog() {
    this.isuserLoggedIn = false;
  }
  onSign() {
    this.isuserLoggedIn = true;
  }

  ngOnInit(): void {
    this.signupService.reloadUser();

    this.registerForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        CustomValidation.passwordMatch(),
      ]),
      gender: new FormControl('male'),
      age: new FormControl(0, CustomValidation.checkAge()),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[789]\d{9}$/),
      ]),

      address: new FormGroup({
        street: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zipCode: new FormControl(null, [
          Validators.minLength(5),
          Validators.maxLength(6),
        ]),
      }),
    });
  }

  uname: string = '';
  generateUsername() {
    let fname = this.registerForm.value.firstName;
    let lname = this.registerForm.value.lastName;
    let ph = this.registerForm.value.phone;
    if (fname > 3) {
      this.uname += fname.slice(0, 3);
    } else {
      this.uname += fname;
    }
    if (lname > 3) {
      this.uname += lname.slice(0, 3);
    } else {
      this.uname += lname;
    }
    this.uname += ph.slice(0, 4);
  }

  onSignup() {
    this.signupService.addUserSignup(this.registerForm.value);
  }

  errorMessage: string = '';

  onLogin(loginData: UserLogin) {
    this.signupService.addUserLogin(loginData);
    this.signupService.invalidUserError.subscribe((isError) => {
      if (isError) {
        this.errorMessage = 'User not found !!!';
      } else {
      }
    });
  }
}
