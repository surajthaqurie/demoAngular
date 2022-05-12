import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PostService } from 'src/app/@core/services/post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit, OnChanges {

  constructor(public postService: PostService
  ) { }

  @Input() newPost: any;

  @Output() postUpdateId: EventEmitter<any> = new EventEmitter();
  @Output() showUpdate: EventEmitter<any> = new EventEmitter();

  posts: any = '';
  errorMessage: string = 'Loading...';
  ngOnInit(): void {
    // console.log("---------------")

    this.postService.getAllPost().subscribe({
      next: (result: any) => {
        // console.log(result);
        this.posts = result.posts

      },
      error: (err) => (this.errorMessage = err.error.msg),
    })

  }
  deletePost(id: string) {
    this.postService.deletePost(id).subscribe({
      next: (result) => {
        console.log(result);

        window.location.reload();
      },
      error: (err) => { console.log(err) }
    })

  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('**************', changes['newPost'])

    // this.posts.push()
    if (changes['newPost'] && !changes['newPost'].firstChange) {
      // this.posts.push(changes['newPost'].currentValue)
    }

  }
  updatePost(id: string) {

    this.postUpdateId.emit(id);
    this.showUpdate.emit(true)
  }

}
