import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';


@Injectable({ providedIn: "root" })
export class ApiService {

  constructor(protected http: HttpClient){}
  protected domain: string = 'https://reqres.in/api/';

  getData(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
          catchError( (err: any, caught: Observable<any>) => {
            return throwError(this.handleError(err, caught)) } ) );
    }


  public handleError(error: HttpErrorResponse, caught: any) : Observable<any>{
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
