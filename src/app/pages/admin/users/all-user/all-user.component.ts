import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css'],
})
export class AllUserComponent implements OnInit {
  constructor(public userService: UserService) {}

  users: any;
  errorMessage: string = 'Loading...';

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
        if (result.success) { // here result.success = trueI
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
}
