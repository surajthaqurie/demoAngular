import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/@core/services/user.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  showCreatePost: boolean = false;
  showUpdate: boolean = false;

  showAll: boolean = false; // -----
  constructor(
    public http: HttpClient,
    public userService: UserService,
    public authService: AuthService
  ) {}

  newPost: any;
  postUpdateId: string = '';
  categoryId: string = '';

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

  postCreatedFn(event: any) {
    this.newPost = event;
  }
  postIdUpdate(event: any) {
    // console.log(event)
    this.postUpdateId = event;
  }

  // this data comes from child (createdCategory component)
  newCategory: any;
  categoryCreatedFn(categoryCreatedEvent: any) {
    this.newCategory = categoryCreatedEvent;
  }

  updateCategory: any;
  categoryUpdateDataFn(event: any) {
    this.updateCategory = event;

    // console.log('Im in dashboard----------------', this.updateCategory);
    // console.log('Hello', event);
  }

  // this data also comes from child (all-category component)
  updateCategoryShow(event: any) {
    this.showUpdateCategory = event;
    this.showAddCategory = false;
  }
  updateCategoryId(event: any) {
    // console.log('--------------id check ------',event);
    this.categoryId = event;
  }

  logOut() {
    return this.authService.logout();
  }

  /*************************/
  showAllPosts: boolean = true;
  showAddPostBtn: boolean = true;
  showAddPost: boolean = false;
  showUpdatePosts: boolean = false;

  showAllCategory: boolean = false;
  showAddCategory: boolean = false;
  showUpdateCategory: boolean = false;
  showAddCategoryBtn: boolean = false;

  showAllUser: boolean = false; // false

  showAddForm() {
    this.showAddPost = true;
    this.showUpdatePosts = false;
  }

  showAllCategoryDetails() {
    this.showAllPosts = false;
    this.showAddPostBtn = false;
    this.showAllUser = false;
    this.showAddPost = false;
    this.showUpdatePosts = false;
    this.showUpdateCategory = false;

    this.showAddCategoryBtn = true;
    this.showAllCategory = true;
  }

  showAddCategoryForm() {
    this.showAddCategory = true;
    this.showAddCategoryBtn = true;
    this.showUpdatePosts = false;
    this.showUpdateCategory = false;
  }

  showUserDetails() {
    this.showAllPosts = false;
    this.showAllCategory = false;
    this.showAddCategoryBtn = false;
    this.showAddPostBtn = false;
    this.showAddPost = false;
    this.showUpdatePosts = false;
    this.showUpdateCategory = false;
    this.showAddCategory = false;
    this.showUpdateCategory = false;

    this.showAllUser = true;
  }

  showPostDetails() {
    this.showAllCategory = false;
    this.showAllUser = false;
    this.showAddCategoryBtn = false;
    this.showUpdateCategory = false;
    this.showAddCategory = false;
    this.showUpdatePosts = false;
    this.showUpdateCategory = false;

    this.showAllPosts = true;
    this.showAddPostBtn = true;
  }

  updatePostShow(event: any) {
    this.showUpdatePosts = event;
    this.showAddPost = false;
    // this.showUpdatePosts= false;
  }

  closePostCreateFn(event: any) {
    this.showAddPost = event;
  }
  closePostUpdateForm(event: any) {
    this.showUpdatePosts = event;
  }
  closeCategoryCreateFn(event: any) {
    this.showAddCategory = event;
  }
  closeCategoryUpdateForm(event: any) {
    this.showUpdateCategory = event;
  }
}
