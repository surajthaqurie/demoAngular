import { Component, OnInit, Output } from '@angular/core';
import { CategoryService } from 'src/app/@core/services/category.services';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/@core/services/post.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  constructor(
    public categoryService: CategoryService,
    public router: Router,
    public postService: PostService
  ) {}

  @Output() postCreated: EventEmitter<any> = new EventEmitter();
  @Output() closeForm: EventEmitter<any> = new EventEmitter();

  category: any;
  errorMessage: string = '';
  successMessage: string = '';
  errTitle: string = '';
  errContent: string = '';

  ngOnInit(): any {
    this.categoryService.getAllCategory().subscribe({
      next: (result: any) => {
        // console.log(result)
        this.category = result.category;
      },
      error: (err) => {
        /* console.log('-------------', err) */
      },
    });
  }
  addPost(postData: NgForm) {
    if (postData.invalid) {
      return;
    }
    // console.log(postData.value)

    this.errorMessage = '';
    this.successMessage = '';
    this.errTitle = '';
    this.errContent = '';

    this.postService.createPost(postData.value).subscribe({
      next: (result: any) => {
        console.log(result);

        this.successMessage = result.msg;
        this.postCreated.emit(result.post);

        window.location.reload();

        // setTimeout(() => {
        //   // window.location.reload();
        //   this.router.navigateByUrl('/admin/dashboard').then();
        // }, 1000);
      },
      error: (err) => {
        // console.log(err.error);
        if (err.error.msg) {
          err.error.msg.includes('Unauthorized')
            ? (this.errorMessage = err.error.msg)
            : '';
          err.error.error.includes('Conflict')
            ? (this.errorMessage = err.error.msg)
            : '';

          err.error.msg[0].includes('title')
            ? (this.errTitle = err.error.msg[0])
            : '';

          err.error.msg[0].includes('content')
            ? (this.errContent = err.error.msg[0])
            : '';
        } else {
          this.errorMessage =
            'Something went wrong please check your connection!!!';
        }
      },
    });
  }
  closeCreateForm() {
    this.closeForm.emit(false);
  }
}
