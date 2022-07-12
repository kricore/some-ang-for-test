import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "./post.interface";
import { PostsService } from "./post.service";

@Component({
  selector: "app-single-post",
  templateUrl: "./post.single.component.html"
})
export class PostComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  post: Post;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('postId') ?? '';
      this.isLoading = true;
      this.postsService.getPost(id)
        .subscribe(response => {
          this.isLoading = false;
          this.constructPostData(response.data);
        });
    });
  }

  constructPostData(response: { [key: string] : any }) : void {
    this.post = {
      title: response['first_name'],
      content: response['last_name'],
      id: response['id'],
      creator: response['email'],
    };
  }

  ngOnDestroy(): void {

  }
}
