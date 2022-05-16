import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css'],
})
export class AllUserComponent implements OnInit {
  constructor(public userService: UserService, public vcr: ViewContainerRef) {}

  users: any;
  errorMessage: string = 'Loading...';
  employeeId: string = '';
  showPermissionForm: boolean = false;

  ngOnInit(): void {
    this.userService.getAllUser().subscribe({
      next: (result: any) => {
        // console.log(result);

        this.users = result.users;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteUser(id: string) {
    this.userService.adminDeleteUser(id).subscribe({
      next: (result: any) => {
        if (result.success) {
          // here result.success = trueI
          return this.listAfterDelete(id);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  listAfterDelete(id: string) {
    this.users = this.users.filter(function (user: any) {
      return user._id !== id;
    });
  }

  async loadAddEmployee() {
    this.vcr.clear();
    const { CreateEmployeeComponent } = await import(
      '../create-employee/create-employee.component'
    );
    this.vcr.createComponent(CreateEmployeeComponent);
  }

  createdEmployeeFn(event: any) {
    this.users.push(event);
  }

  showEmployeeForm: boolean = false;
  showAddForm() {
    this.showEmployeeForm = true;
  }

  closeFormFn(event: any) {
    this.showEmployeeForm = event;
  }

  editEmployee(id: string) {
    this.showPermissionForm = true;
    this.showEmployeeForm = false;
    this.employeeId = id;
  }

  closePermissionFormFn(event: any) {
    this.showPermissionForm = false;
  }
}
