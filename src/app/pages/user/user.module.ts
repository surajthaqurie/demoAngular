import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent,
    UserProfileComponent,
    UserUpdateComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
