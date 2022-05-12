import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(public userService: UserService) {}

  user: any;

  ngOnInit(): any {
    /* this.activeActive.paramMap.subscribe((param: ParamMap) => {
      const userId = param.get('id');

      return this.userService.getCurrentUser().subscribe({
        next: (result: any) => {
          console.log(result);
          this.user = result.user;
        },
        error: (err) => {
          console.log('--------Errors-----', err);
        },
      });
    }); */

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
}
