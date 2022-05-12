import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { SinglePostComponent } from './single-post/single-post.component';
import { CategoryModule } from '../category/category.module';
import { AllPostComponent } from './all-post/all-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { FormsModule } from '@angular/forms';
import { PostComponent } from './post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { PostCommentComponent } from './post-comment/post-comment.component';


@NgModule({
  declarations: [
    SinglePostComponent,
    AllPostComponent,
    AddPostComponent,
    PostComponent,
    UpdatePostComponent,
    PostCommentComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    CategoryModule,
    FormsModule
  ],
  exports: [AllPostComponent, AddPostComponent, UpdatePostComponent]
})
export class PostModule { }
