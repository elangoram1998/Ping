import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, debounceTime, map, switchMap, take } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class UniqueUsernameValidator implements AsyncValidator {
    constructor(private authService: AuthService) { }

    validate = (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return ctrl.valueChanges.pipe(
            debounceTime(600),
            take(1),
            switchMap(_ => {
                return this.authService.isUsernameAvailable(ctrl.value).pipe(
                    map(username => {
                        return username ? { usernameExist: true } : null
                    }),
                    catchError(() => of(null))
                );
            })
        );
    }
}