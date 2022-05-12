import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  constructor(public userService: UserService, public router: Router) {}

  user: any;
  errorMessage: string = '';
  successMessage: string = '';
  errFirstName: string = '';
  errLastName: string = '';
  errEmail: string = '';
  errPassword: string = '';
  errContactNo: string = '';
  errAddress: string = '';

  errStreet: string = '';
  errCountry: string = '';
  errCity: string = '';
  errPostalCode: string = '';

  ngOnInit(): any {
    return this.userService.getCurrentUser().subscribe({
      next: (result: any) => {
        // console.log(result);

        this.user = result.userProfile;
      },
      error: (err) => {
        console.log('--------Errors-----', err);
      },
    });
  }

  // For file Upload
  file: any;
  onFileSelect(event: any) {
    this.file = event.target.files[0];
  }

  // On form submit
  updateUserProfile(updateData: NgForm) {
    // console.log(updateData.invalid);

    // if (updateData.invalid) {
    //   return;
    // }

    // Error Message handling
    this.errorMessage = '';
    this.errFirstName = '';
    this.errLastName = '';
    this.errEmail = '';
    this.errPassword = '';
    this.errContactNo = '';
    this.errAddress = '';
    this.errStreet = '';
    this.errCountry = '';
    this.errCity = '';
    this.errPostalCode = '';

    this.userService.updateUserProfile(updateData.value, this.file).subscribe({
      next: (result: any) => {
        this.successMessage = result.msg;

        this.user = result.user;
        

        // setTimeout(() => {
        // this.router.navigateByUrl('/').then();
        // window.location.reload();
        // }, 1000);

        // console.log('--------------------', result);
      },
      error: (err) => {
        console.log(err.error);

        if (err.error.msg) {
          err.error.msg[0].includes('firstName')
            ? (this.errFirstName = err.error.msg[0])
            : '';

          err.error.msg[0].includes('lastName')
            ? (this.errLastName = err.error.msg[0])
            : '';

          err.error.msg[0].includes('email') || err.error.msg.includes('email')
            ? (this.errEmail =
                err.error.msg[0].length > 1
                  ? err.error.msg[0]
                  : err.error.msg || err.error.msg)
            : '';

          err.error.msg[0].includes('password')
            ? (this.errPassword = err.error.msg[0])
            : '';

          err.error.msg[0].includes('number') ||
          err.error.msg.includes('number')
            ? (this.errContactNo =
                err.error.msg[0].length > 1
                  ? err.error.msg[0]
                  : err.error.msg || err.error.msg)
            : '';

          err.error.msg[0].includes('address')
            ? (this.errAddress = err.error.msg[0])
            : '';
          err.error.msg[0].includes('street')
            ? (this.errStreet = err.error.msg[0])
            : '';
          err.error.msg[0].includes('city')
            ? (this.errCountry = err.error.msg[0])
            : '';
          err.error.msg[0].includes('city')
            ? (this.errCity = err.error.msg[0])
            : '';

          err.error.msg[0].includes('postal') ||
          err.error.msg[0].includes('zip')
            ? (this.errPostalCode = err.error.msg[0])
            : '';
        } else {
          this.errorMessage =
            'Something went wrong please check your connection!!!';
        }
      },
    });
  }

  passwordChangeSuccessMsg: string = '';
  errCurrentPassword: string = '';
  errNewPassword: string = '';
  errConfirmPassword: string = '';
  passwordChangeErrorMsg: string = '';

  updateUserPassword(updatePasswordData: NgForm) {
    if (updatePasswordData.invalid) {
      return;
    }
    this.passwordChangeSuccessMsg = '';
    this.errCurrentPassword = '';
    this.errNewPassword = '';
    this.errConfirmPassword = '';
    this.passwordChangeErrorMsg = '';

    this.userService.updateUserPassword(updatePasswordData.value).subscribe({
      next: (result) => {
        // console.log(result);
        setTimeout(() => {
          // this.router.navigateByUrl('/').then();
          window.location.reload();
        }, 1000);
      },
      error: (err) => {
        console.log(err.error);
        if (err.error.msg) {
          err.error.msg[0].includes('Current') ||
          err.error.msg.includes('password is incorrect')
            ? (this.errCurrentPassword =
                err.error.msg[0].length > 1
                  ? err.error.msg[0]
                  : err.error.msg || err.error.msg)
            : '';

          err.error.msg[0].includes('confirm')
            ? (this.errConfirmPassword = err.error.msg[0])
            : '';

          err.error.msg[0].includes('new') ||
          err.error.msg.includes('new password and confirm')
            ? (this.errNewPassword =
                err.error.msg[0].length > 1
                  ? err.error.msg[0]
                  : err.error.msg || err.error.msg)
            : '';
        } else {
          this.passwordChangeErrorMsg =
            'Something went wrong please check your connection!!!';
        }
      },
    });
  }
  showPassword: boolean = false;
  showPasswordForm() {
    this.showPassword = !this.showPassword;
  }
}
