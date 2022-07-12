import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { ApiService } from "../api/api.service";

@Injectable({ providedIn: "root" })
export class BatchService extends ApiService{

  public submitBatchForm(payload: {[key: string] : any}) : Observable<any> {
    const postData = new FormData;
    const { images, files, title} = payload;
    postData.append("title", title);
    postData.append("files", files);
    postData.append("images", images);

    return this.http
      .post<{message: string;}>('http://localhost:3000/dummy', postData)
        .pipe(
          catchError(
              (error, caught: Observable<any>) => this.handleError(error, caught)
            )
        );
  }

}
