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
            this.checkIfBookDescriptionHasLengthLimit();
        });
    }

    public checkInput():void
    {
        let searchValue:string = this._searchValue.toLowerCase();
        searchValue = searchValue.replace(/\s/g, '');

        if(!isNullOrUndefined(searchValue) && searchValue !== '')
        {
            this._books.forEach(book =>
            {
                let bookTitle:string = book.title.toLowerCase();
                bookTitle = bookTitle.replace(/\s/g, '');
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

    private getAllBooks():Observable<any>
    {
        let url:string = 'src/app/assets/data/books.json';

        return this._http.get(url);
    }

    private checkIfBookDescriptionHasLengthLimit():void
    {
        this._books.forEach(book =>
        {
            if(book.description.length > 400)
            {
                book.description = book.description.substring(0, 400);
                let lastIndex:number = book.description.lastIndexOf(' ');
                book.description = book.description.substring(0, lastIndex);
                book.description += '... <i class="more">[Mehr]</i>'
            }
            else
            {
                if(book.description === '')
                {
                    book.description = 'Keine Beschreibung.';
                }
            }
        });
    }

}
