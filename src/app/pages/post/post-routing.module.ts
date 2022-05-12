import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { AllPostComponent } from './all-post/all-post.component';
import { PostComponent } from './post.component';
import { SinglePostComponent } from './single-post/single-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    children: [
      {
        path: 'all',
        component: AllPostComponent,
        outlet:'dash'
      },
      {
        path: 'create',
        component: AddPostComponent
      }
    ]
  },
  {
    path: 'details/:slug',
    component: SinglePostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
