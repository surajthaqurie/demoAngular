import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/@core/services/user.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public userService: UserService,
    public authService: AuthService
  ) {}

  public user: any;

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (result: any) => {
        this.user = result.userProfile;
        // console.log(this.user);
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }

  logOut() {
    return this.authService.logout();
  }
}
