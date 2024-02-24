import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {MessageService} from "primeng/api";

@Injectable()
export class AppService {
  constructor(private http: HttpClient, private messageService: MessageService) { }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      this.messageService.add({severity: 'error', summary: 'Failed to connect', detail: "API is currently not available. Please try again later."})
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      this.messageService.add({severity: 'error', summary: 'Microbot api error', detail: error.error})
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getToken() {
    return this.http.get<string>('http://localhost:5029/token').pipe(
      catchError((err) => this.handleError(err))
    );
  }
}
