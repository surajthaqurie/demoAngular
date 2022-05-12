import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostModule } from '../post/post.module';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AllUserComponent } from './users/all-user/all-user.component';
import { AllCategoryComponent } from './categories/all-category/all-category.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { UpdateCategoryComponent } from './categories/update-category/update-category.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    AllUserComponent,
    AllCategoryComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    RouterModule,
    PostModule,
  ],
  exports: [DashboardComponent],
})
export class AdminModule {}
