import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './posts/post.single.component';
import { PostListComponent } from './posts/post.list.component';
import { BrowserModule } from "@angular/platform-browser";
import {AppRoutingModule} from './routes.module';
import { MaterialUIModule } from "./material.module";
import { PostEdit } from './posts/post.edit.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

// configures NgModule imports and exports
@NgModule({
  declarations: [PostComponent, PostListComponent, PostEdit],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialUIModule

  ]
})
export class PostsModule { }
