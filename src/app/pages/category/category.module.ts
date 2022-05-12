import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';


@NgModule({
  declarations: [
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ],
  exports: [CategoryListComponent]

})
export class CategoryModule { }
