import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { Post } from "./post.interface";
import { PostsService } from "./post.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PostEdit } from "./post.edit.component";

@Component({
  selector: "app-post-list",
  templateUrl: "./post.list.component.html"
})
export class PostListComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  posts: Post[] = [];
  page: number = 1;
  id: string = '1';

  private postsSub: Subscription;

  constructor(
    private postsService: PostsService,
    public dialog: MatDialog
  ){}

  openDialog(): void {
    const dialogRef = this.dialog.open(PostEdit, {
      width: '50%',
      data: {
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.id = '1';
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.page);
    this.postsSub = this.postsService
      .getPostsListener()
      .subscribe(response => {
        this.isLoading = false;
        this.posts = response.posts;
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
