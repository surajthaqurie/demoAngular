import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public $router: Router
  ) {}

  @Output() employeeCreated: EventEmitter<any> = new EventEmitter();
  @Output() closeForm: EventEmitter<any> = new EventEmitter();

  registerForm: any;
  errorMessage: string = '';
  successMessage: string = '';
  errEmail: string = '';
  errContactNo: string = '';

  ngOnInit(): void {
    // this.registerForm.patchValue({
    //   firstName: 'demo',
    // });
    this.registerForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      contactNo: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      termsAndCondition: [true, [Validators.required]],
    });
  }

  get rgForm() {
    return this.registerForm.controls;
  }
  submitted = false;
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  createEmployee() {
    if (this.registerForm.invalid) {
      return;
    }
    this.submitted = true;

    this.errEmail = '';
    this.errContactNo = '';

    this.authService.authEmployeeSignup(this.registerForm.value).subscribe({
      next: (result: any) => {
        this.successMessage = result.msg;
        this.employeeCreated.emit(result.employee);
        
        setTimeout(() => {
          this.closeForm.emit(false);
          this.registerForm.reset();
          this.successMessage = '';
          this.$router.navigateByUrl('/admin/dashboard').then();
        }, 1000);
      },
      // {IMP} Server side error handling :)
      error: (err) => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.error.msg.includes('email')) {
            const formControl = this.registerForm.get('email');
            if (formControl) {
              formControl.setErrors({
                serverError: err.error.msg,
              });
            }
            // else condition
          }
          if (err.error.msg.includes('number')) {
            const formControl = this.registerForm.get('contactNo');
            if (formControl) {
              formControl.setErrors({
                serverError: err.error.msg,
              });
            }
            // else condition for guard custom validation
          }
        }
      },
    });
  }
  closeCreateForm() {
    this.closeForm.emit(false);
  }
}
