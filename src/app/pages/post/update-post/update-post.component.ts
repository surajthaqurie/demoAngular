import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/@core/services/category.services';
import { PostService } from 'src/app/@core/services/post.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
})
export class UpdatePostComponent implements OnInit, OnChanges {
  @Input() postUpdateId: string = '';
  @Output() closeUpdate: EventEmitter<any> = new EventEmitter();

  constructor(
    public categoryService: CategoryService,
    public router: Router,
    public postService: PostService
  ) {}

  catTitle: string = '';
  catId: string = '';

  ngOnChanges(): void {
    this.postService.getPostById(this.postUpdateId).subscribe({
      next: (result: any) => {
        this.post = result.posts;
        this.catId = result?.posts?.category?._id;
      },
    });
    this.postService.getPostById(this.postUpdateId).subscribe({
      next: (result: any) => {
        this.catTitle = result?.posts?.category?.title;
      },
    });
  }

  post: any;
  category: any;
  errorMessage: string = '';
  successMessage: string = '';
  errTitle: string = '';
  errContent: string = '';
  showOptions: boolean = true;
  categoryError: string = '';

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (result: any) => {
        // console.log('-----------------------',result)
        this.category = result.category;
      },
      error: (err) => {
        /* console.log('-------------', err) */
      },
    });
    this.postService.getPostById(this.postUpdateId).subscribe({
      next: (result: any) => {
        this.post = result.posts;
        this.catTitle = result?.posts?.category?.title;
      },
    });
  }

  // For File Upload
  file: any;
  onFileSelect(event: any) {
    this.file = event.target.files[0];
  }

  // On Submit
  updatePost(postData: NgForm) {
    if (postData.invalid) {
      return;
    }

    const data = postData.value;

    // Backend Error Handling
    this.errorMessage = '';
    this.successMessage = '';
    this.errTitle = '';
    this.errContent = '';
    this.categoryError = '';

    if (!data.category) {
      data.category = this.catId;
    }

    this.postService
      .updatedPost(this.postUpdateId, postData.value, this.file)
      .subscribe({
        next: (result: any) => {
          // console.log('--------------------', result);
          this.successMessage = result.msg;

          window.location.reload();
        },
        error: (err) => {
          console.log(err.error);
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

            err.error.msg[0].includes('category')
              ? (this.categoryError = err.error.msg[0])
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
  showSelect() {
    this.showOptions = this.showOptions ? false : true;
  }
  closeUpdateForm() {
    this.closeUpdate.emit(false);
  }
}
