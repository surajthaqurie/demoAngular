import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/@core/services/post.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css'],
})
export class PostCommentComponent implements OnInit {
  constructor(
    public postService: PostService // public $activeRoute: ActivatedRoute
  ) {}

  post!: any;
  @Input() postData: any;
  @Output() newCommentData: EventEmitter<any> = new EventEmitter();
  @Output() newReplyCommentData: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}

  addComment(commentText: NgForm) {
    if (commentText.value.text === '') {
      return;
    }
    this.postService
      .addPostComment(this.postData._id, commentText.value)
      .subscribe({
        next: (result: any) => {
          commentText.reset();
          this.newCommentData.emit(result.comment);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  commentId: string = '';
  logMessageId(el: any) {
    let commentId = el.getAttribute('data-message-id'); // [attr.data-message-id]="comment._id"
    // console.log('------------------>', commentId);
    this.commentId = commentId;
  }

  addReplyComment(commentText: NgForm) {
    // console.log(commentText);
    if (commentText.value.text === '') {
      return;
    }

    return this.postService
      .addReplyComment(this.commentId, commentText.value)
      .subscribe({
        next: (result: any) => {
          // console.log('---------------', result.replayComment._id);
          commentText.reset();
          // - success ---------------------------------
          // this.newCommentData.emit(result.comment);
          console.log('----------------', this.postData);

          // get New Comment with replies
          const updatedComment = this.getUpdatedComment(
            result.replayComment._id
          ); // ~ it return comment object not in array

          console.log(updatedComment);

          // delete old comment and push new one which has replies
          /*  const deleteOldComment = */ this.postData.comments.filter(
            (cmt: any) => {
              return cmt._id !== result.replayComment._id;
            }
          );

          // console.log(deleteOldComment);
          console.log('------After remove-------', this.postData);
        },

        error: (err) => {
          console.log(err);
        },
      });
  }

  getUpdatedComment(id: string) {
    return this.postService.getCommentByd(id).subscribe({
      next: (result: any) => {
        return result.comment;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // deleteOldAddNewComment(id: string) {
  //   // console.log('-----------------------', this.postData);

  //   this.postData.comments.filter((cmt: any) => {
  //     return cmt._id !== id;
  //   });

  // this.postData.comments.push(this.updatedComment);
  // console.log('++++++++++++++++', this.postData);
  // this.postData.comments.replies.push(this.updatedComment.replies);
  // }
  errorMessage: string = '';
  approveComment(commentId: string) {
    console.log('im clicked', commentId);

    this.postService.makeCommentApproved(commentId).subscribe({
      next: (result: any) => {
        console.log(result);

        setTimeout(() => {
          window.location.reload();
        }, 500);
      },
      error: (err) => {
        console.log(err);

        this.errorMessage = err.error.msg;

        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      },
    });
  }
}
