import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from 'src/app/@core/services/user.service';

import { PostService } from '../../../@core/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public postService: PostService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public userService: UserService
  ) {}

  public posts: any;

  ngOnInit(): any {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      const catTitle = params.get('title');
      if (this.router.url === `/post/category/${catTitle}`) {
        // here we can create new api (then aggregate: $look)
        return this.postService
          .getAllPost()
          .pipe(
            map((post: any) =>
              post.posts.filter((p: any) => p.category.title === catTitle)
            )
          )
          .subscribe({
            next: (result: any) => {
              // console.log("-----result------", result);
              this.posts = result;
            },
            error: (err) => {
              console.log('--------Errors-----', err);
            },
          });
      } else {
        return this.postService.getAllPost().subscribe({
          next: (result: any) => {
            /* console.log(result); */ this.posts = result.posts;
          },
          error: (err) => {
            console.log('-------------', err);
          },
        });
      }
    });
  }
  public isFavorite: boolean = false;
  clickEvent() {
    this.isFavorite = !this.isFavorite;
  }

  active: any;
  selected: any;

  setIndex(index: number) {
    this.selected = index;

    
 }
}
