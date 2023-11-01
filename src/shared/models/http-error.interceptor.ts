import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),

      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // client-side error

          errorMessage = 'Custom Error: ' + error.error.message;
        } else {
          // server-side error

          errorMessage =
            'Custom Error Code: ' + error.status + '\nMessage: ' + error.message;
        }


        // window.alert(errorMessage);
        const dialogRef = this.dialog.open(ErrorDialogComponent, {data: {title: "Error: "+error.status, message:[errorMessage], dangerButton: "Relaod Page", neutralButton: "Cancel"}});
        return throwError(errorMessage);
      })
    );
  }
}
