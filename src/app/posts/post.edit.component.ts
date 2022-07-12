import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostsService } from "./post.service";

@Component({
  selector: "app-edit-post",
  templateUrl: "./post.edit.component.html"
})
export class PostEdit implements OnInit, OnDestroy{

  form: FormGroup;
  private shouldRender: boolean = false;

  constructor(
    private postsService: PostsService,
  ){}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)],
      }),
      author: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)],
      })
    });
  }

  ngOnDestroy(): void {

  }

  onUpdatePost(){

  }
}
