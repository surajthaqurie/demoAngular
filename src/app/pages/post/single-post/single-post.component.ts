import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/@core/services/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  constructor(
    public postService: PostService,
    public activeRoute: ActivatedRoute
  ) {}
  post!: any;
  comment!: any;

  ngOnInit(): void {
    // console.log(this.activeRoute.snapshot.params['slug'])
    // console.log(this.activeRoute.snapshot.paramMap.get('slug'))

    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      const slug = params.get('slug');

      return this.postService.getPostBySlug(slug).subscribe({
        next: (result: any) => {
          // console.log(result);
          this.post = result.posts;
        },
        error: (err) => {
          console.log('-------------', err);
        },
      });
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
