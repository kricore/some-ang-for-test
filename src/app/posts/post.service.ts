import { Injectable } from "@angular/core";
import { Subject, Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Post } from "./post.interface";

import { ApiService } from "../api/api.service";


@Injectable({ providedIn: "root" })
export class PostsService extends ApiService {

  private posts : Post[] = [];
  private postsUpdated = new Subject<{posts: Post[]}>;

  getPost(id: string): Observable<any>{
    const url = `${this.domain}users/${id}`;

    return this.http.get<any>(url).pipe(
      catchError( (err: any, caught: Observable<any>) =>
        {
          return throwError(super.handleError(err, caught))
        })
      );
  }

  updatePost(id: string): void {

  }

  /**
   * Get all posts and format them
   * to our internal model
   * @param page
   */
  getPosts(page : number): void {
    this.http.get<{ message: string, posts: any }>(`${this.domain}users/?page=${page}`)
      .pipe(
        map((response : {[key : string]: any}) => {
          return {
            posts: response['data'].map((post : { [key: string] : any }) => {
              return {
                title: post['first_name'],
                content: post['last_name'],
                id: post['id'],
                creator: post['email'],
              }
            })
          }
        })
      )
      .subscribe((posts : any) => {
        this.posts = posts['posts'];
        this.postsUpdated.next({
          posts: [...this.posts]
        })
      });
  }

  getPostsListener(){
    return this.postsUpdated && this.postsUpdated.asObservable();
  }

}
