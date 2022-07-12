import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { BatchUploadComponent } from "./forms/batch.component";
import { PostListComponent } from './posts/post.list.component';
import { PostComponent } from './posts/post.single.component';

const routes: Routes = [
  { path: '', component: BatchUploadComponent },
  { path: 'posts', component: PostListComponent},
  { path: 'posts/:postId', component: PostComponent},
  { path: '**', component: BatchUploadComponent }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
