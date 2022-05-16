import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/@core/services/permission.service';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css'],
})
export class PermissionComponent implements OnInit, OnChanges {
  @Output() closeForm: EventEmitter<any> = new EventEmitter();
  @Input() employeeId: string = '';

  employee: any;
  permissionResources: any;
  managePermission: any;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    public userService: UserService,
    public permissionService: PermissionService,
    public formBuilder: FormBuilder,
    public $router: Router
  ) {}

  ngOnInit(): void {
    // this.permissionService.getAllPermission().subscribe({
    //   next: (result: any) => {
    //     console.log(result);
    //     this.permissions = result.permissions;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
    this.permissionService.getAllResources().subscribe({
      next: (result: any) => {
        console.log(result.resource);
        this.permissionResources = result.resource;
      },
      error: (err) => {
        console.log(err.error);
      },
    });

    this.managePermission = this.formBuilder.group({
      user: [this.employeeId],
      access_control: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userService.getUserById(this.employeeId).subscribe({
      next: (result: any) => {
        // console.log(result.user);
        this.employee = result.user;
      },
      error: (err) => {
        // console.log(err);
      },
    });

    this.permissionService.getEmployeePermission(this.employeeId).subscribe({
      next: (result: any) => {
        // console.log(result);

        this.managePermission.patchValue({
          access_control: result.permission?.access_control?.toString(),
        });
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  closeCreateForm() {
    this.closeForm.emit(false);
  }

  resourceId: string = '';
  getResourceId(el: any) {
    this.resourceId = el.getAttribute('data-message-id'); // [attr.data-message-id]="comment._id"
    // console.log('-------------', this.resourceId);
  }

  managePermissionForm() {
    // console.log(Array.from(this.managePermission.value.access_control));
    // console.log(this.managePermission.value.access_control.split());

    if (this.managePermission.value.access_control === '') {
      window.alert('Please assign the role !!!');
      return;
    }

    const managePermissionData = {
      user: this.managePermission.value.user,
      access_control: this.managePermission.value.access_control.split(),
    };

    // console.log(managePermissionData);

    this.permissionService
      .setResourcePermission(this.resourceId, managePermissionData)
      .subscribe({
        next: (result: any) => {
          // console.log(result);
          this.successMessage = result.msg;

          setTimeout(() => {
            this.closeForm.emit(false);
            this.managePermission.reset();
            this.successMessage = '';
            this.$router.navigateByUrl('/admin/dashboard').then();
          }, 1000);
        },
        error: (err) => {
          // console.log(err);
          this.errorMessage = err.error.msg;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        },
      });
  }
}
