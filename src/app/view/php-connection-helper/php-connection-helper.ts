import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    Headers,
    Http
} from '@angular/http';
import { OwnerInterface } from '../new-book-view/interface/owner.interface';
import { AuthorInterface } from '../new-book-view/interface/author.interface';
import { StorageInterface } from '../new-book-view/interface/storage.interface';
import { PublisherInterface } from '../new-book-view/interface/publisher.interface';

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

    public getAllGenre():Observable<any>
    {
        let url:string = 'assets/php/genre/get/getAllGenre.php';
        return this._http.get(
            url,
            {
                headers: this._header
            }
        );
    }

    public getAllOwners():Observable<any>
    {
        let url:string = 'assets/php/owners/get/GetAllOwners.php';
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

    public insertNewGenre(name:string):Observable<any>
    {
        let url:string = 'assets/php/genre/insert/InsertNewGenre.php';

        return this._http.post(
            url,
            {
                name: name,
            },
            {
                headers: this._header
            }
        );
    }

    public insertNewOwner(newOwnerData:OwnerInterface):Observable<any>
    {
        let url:string = 'assets/php/owners/insert/InsertNewOwner.php';

        return this._http.post(
            url,
            newOwnerData,
            {
                headers: this._header
            }
        );
    }

    public insertNewAuthor(newAuthorData:AuthorInterface):Observable<any>
    {
        let url:string = 'assets/php/author/insert/InsertNewAuthor.php';

        return this._http.post(
            url,
            newAuthorData,
            {
                headers: this._header
            }
        );
    }

    public insertNewStorage(newStorageData:StorageInterface):Observable<any>
    {
        let url:string = 'assets/php/storage/insert/InsertNewStorage.php';

        return this._http.post(
            url,
            newStorageData,
            {
                headers: this._header
            }
        );
    }

    public insertNewPublisher(newPublishrData:PublisherInterface):Observable<any>
    {
        let url:string = 'assets/php/publisher/insert/InsertNewPublisherClass.php';
        return this._http.post(
            url,
            newPublishrData,
            {
                headers: this._header
            }
        );
    }

}
