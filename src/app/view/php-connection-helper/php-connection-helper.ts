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

    public getAllAuthors():Observable<any>
    {
        let url:string = 'assets/php/author/allAuthors/getAllAuthors.php';
        return this._http.get(
            url,
            {
                headers: this._header
            }
        );
    }

    public getAllPublishers():Observable<any>
    {
        let url:string = 'assets/php/publisher/allPublisher/getAllPublishers.php';
        return this._http.get(
            url,
            {
                headers: this._header
            }
        );
    }

    public getAllStorages():Observable<any>
    {
        let url:string = 'assets/php/storage/allStorages/getAllStorages.php';
        return this._http.get(
            url,
            {
                headers: this._header
            }
        );
    }

    public getAllBooks():Observable<any>
    {
        let url:string = 'assets/php/books/get/allBooks/GetAllBooks.php';
        return this._http.get(
            url,
            {
                headers: this._header
            }
        );
    }
}
