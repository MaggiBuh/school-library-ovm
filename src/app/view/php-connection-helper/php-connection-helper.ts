import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    Headers,
    Http
} from '@angular/http';

@Injectable()
export class PhpConnectionHelper
{

    private _header:any = new Headers();

    constructor(private _http:Http)
    {
    }

    public loginWithExistingAccount(userName:string, password:string):Observable<any>
    {
        let url:string = 'assets/php/login/getExistingLoginUserByUsernameAndPassword.php';
        return this._http.post(
            url,
            {
                userName: userName,
                password: password
            },
            {
                headers: this._header
            }
        );
    }

}
