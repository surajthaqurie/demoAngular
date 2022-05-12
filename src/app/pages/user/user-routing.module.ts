import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from '../post/post.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    children: [
      {
        path: 'profile',
        component: UserProfileComponent,
      },
      {
        path: 'edit',
        component: UserUpdateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
