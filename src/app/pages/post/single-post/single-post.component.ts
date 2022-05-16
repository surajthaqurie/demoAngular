import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/@core/services/post.service';
import { AuthService } from 'src/app/@core/services/authenticate.service';
import { PermissionService } from 'src/app/@core/services/permission.service';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  constructor(
    public postService: PostService,
    public activeRoute: ActivatedRoute,
    public authService: AuthService,
    public permissionService: PermissionService,
    public userService: UserService
  ) {}
  post!: any;
  comment!: any;
  userId: string = '';
  userRole: any;
  userPermission: any;

  ngOnInit(): void {
    // this.userService.getCurrentUser().subscribe({
    //   next: (result: any) => {
    //     this.userId = result.userProfile._id;
    //     this.userRole = result.userProfile;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });

    // this.permissionService.getEmployeePermission(this.userId).subscribe({
    //   next: (result: any) => {},
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      const slug = params.get('slug');

      const user = this.authService.getDecodedUser('token');

      if (user.role[0] === 'user') {
        return this.postService.getPostBySlug(slug).subscribe({
          next: (result: any) => {
            // console.log(result);
            this.post = result.posts;
          },
          error: (err) => {
            console.log('-------------', err);
          },
        });
      }
      return this.postService.getPostUnApprovedComment(slug).subscribe({
        next: (result: any) => {
          // console.log(result);
          this.post = result.posts;
          // console.log(result.posts)
        },
        error: (err) => {
          console.log('-------------', err);
        },
      });

      /* 
      if (this.userRole?.role[0] === 'admin') {
        return this.postService.getPostUnApprovedComment(slug).subscribe({
          next: (result: any) => {
            // console.log(result);
            this.post = result.posts;
            // console.log(result.posts)
          },
          error: (err) => {
            console.log('-------------', err);
          },
        });
      }

      if (this.userPermission?.includes('approve')) {
        return this.postService.getPostUnApprovedComment(slug).subscribe({
          next: (result: any) => {
            // console.log(result);
            this.post = result.posts;
            // console.log(result.posts)
          },
          error: (err) => {
            console.log('-------------', err);
          },
        });
      }
      return this.postService.getPostBySlug(slug).subscribe({
        next: (result: any) => {
          // console.log(result);
          this.post = result.posts;
        },
        error: (err) => {
          console.log('-------------', err);
        },
      });
      */
    });
  }

  newCommentFn(event: EventEmitter<any>) {
    const post: any = event;
    return this.postService.getPostById(post._id).subscribe({
      next: (result: any) => {
        // console.log('im from single comment', result);
        this.post = result.posts; // comment array  comment.findById()-->object
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  // get all replies of the comment with comment id
  getAllRepliesOfComment() {}

  updatedComment: any;
  getUpdatedCommentFn(event: any) {
    /* this.updatedComment = event; // object of comment with replies info

    // delete first and add whole object with replies in that place
    const newPostWithComment = this.post.comments;

    this.post.comments.filter((cmt: any) => {
      // console.log(cmt._id);
      // console.log(this.updatedComment._id);
      return cmt._id !== this.updatedComment._id;
    });
    // console.log('*****************', this.updatedComment);
    // console.log('--------------------', this.post);

    // this.post.comments.push(this.updatedComment);
    const postComment = newPostWithComment.filter((cmt: any) => {
      console.log(this.updatedComment._id);

      return cmt._id !== this.updatedComment._id;
    });

    console.log('-----------------', postComment);

    // console.log('&&&&&&&&&&&&&&&&&&&', newPostWithComment);
    this.post.comments.push(this.updatedComment);

    console.log(this.post); */
  }
}
