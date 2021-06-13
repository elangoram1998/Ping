import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export const handleError = (error: HttpErrorResponse) => {
    let errorMessage = '';
    errorMessage = `Error code: ${error.status}, Message: ${error.message}`;
    console.error(errorMessage);
    return throwError(errorMessage);
}