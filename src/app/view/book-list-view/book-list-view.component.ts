import {
    Component,
    OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'book-list-view',
    template: require('./book-list-view.component.html'),
    styles:   [require('./book-list-view.component.scss')],
})
export class BookListViewComponent implements OnInit
{

    private _books:Array<any> = [];
    private _searchValue:string;

    public constructor(private _http:Http)
    {
    }

    public ngOnInit():void
    {
        this.getAllBooks().subscribe((res:any) =>
        {
            this._books = res.json();
        });
    }

    public checkInput():void
    {
        let searchValue:string = this._searchValue.toLowerCase();

        if(!isNullOrUndefined(searchValue) && searchValue !== '')
        {
            this._books.forEach(book =>
            {
                let bookTitle:string = book.title.toLowerCase();
                if(!isNullOrUndefined(book.title) && book.title !== '')
                {
                    if(bookTitle.includes(searchValue))
                    {
                        let bookContainer:any = document.getElementById(book.id + '_container');
                        bookContainer.style.display = 'block';
                    }
                    else
                    {
                        let bookContainer:any = document.getElementById(book.id + '_container');
                        bookContainer.style.display = 'none';
                    }
                }

            });
        }
        else
        {
            if(searchValue === '')
            {
                this._books.forEach(book =>
                {
                    let bookContainer:any = document.getElementById(book.id + '_container');
                    bookContainer.style.display = 'block';
                });
            }
        }
    }

    public getAllBooks():Observable<any>
    {
        let url:string = 'src/app/assets/data/books.json';

        return this._http.get(url);
    }

}
