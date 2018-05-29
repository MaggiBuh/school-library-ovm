import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { isNullOrUndefined } from 'util';
import { PhpConnectionHelper } from '../php-connection-helper/php-connection-helper';
import { TerraOverlayComponent } from '@plentymarkets/terra-components';

@Component({
    selector: 'book-list-view',
    template: require('./book-list-view.component.html'),
    styles:   [require('./book-list-view.component.scss')],
})
export class BookListViewComponent implements OnInit
{
    @ViewChild('bookDetailOverlay') public bookDetailOverlay:TerraOverlayComponent;
    private _books:Array<any> = [];
    private _currentBook:Array<any> = [];
    private _searchValue:string;


    public constructor(private _phpConnectionHelper:PhpConnectionHelper)
    {
    }

    public ngOnInit():void
    {
        this._phpConnectionHelper.getAllBooks().subscribe((res:any) => {
            if(isNullOrUndefined(res.json().error))
            {
                this._books = res.json();
                this.checkIfBookDescriptionHasLengthLimit();
            }
        });
    }

    public openBookDetailsOverlay(book:Array<any>):void
    {
        this.setCurrentBook(book);
        this.bookDetailOverlay.showOverlay();
    }

    public checkInput():void
    {
        if(!isNullOrUndefined(this._books) && this._books.length > 0)
        {
            let searchValue:string = this._searchValue.toLowerCase();
            searchValue = searchValue.replace(/\s/g, '');

            if(!isNullOrUndefined(searchValue) && searchValue !== '')
            {
                this._books.forEach(book => {
                    let bookTitle:string = book.BookName.toLowerCase();
                    bookTitle = bookTitle.replace(/\s/g, '');
                    if(!isNullOrUndefined(book.BookName) && book.BookName !== '')
                    {
                        if(bookTitle.includes(searchValue))
                        {
                            let bookContainer:any = document.getElementById(book.bookId + '_container');
                            bookContainer.style.display = 'block';
                        }
                        else
                        {
                            let bookContainer:any = document.getElementById(book.bookId + '_container');
                            bookContainer.style.display = 'none';
                        }
                    }

                });
            }
            else
            {
                if(searchValue === '')
                {
                    this._books.forEach(book => {
                        let bookContainer:any = document.getElementById(book.bookId + '_container');
                        bookContainer.style.display = 'block';
                    });
                }
            }
        }
    }

    private checkIfBookDescriptionHasLengthLimit():void
    {
        if(!isNullOrUndefined(this._books) && this._books.length > 0)
        {
            this._books.forEach(book => {
                if(book.bookDescription.length > 400)
                {
                    let shortBookDescription:string = book.bookDescription.substring(0, 400);
                    let lastIndex:number = shortBookDescription.lastIndexOf(' ');
                    shortBookDescription = shortBookDescription.substring(0, lastIndex);
                    shortBookDescription += '... <i class="more">[Mehr]</i>';
                    book['shortBookDescription'] = shortBookDescription;
                }
                else
                {
                    if(book.bookDescription === '')
                    {
                        book.bookDescription = 'Keine Beschreibung.';
                    }
                    book['shortBookDescription'] = book.bookDescription;
                }
            });
        }
    }

    private setCurrentBook(book:Array<any>):void
    {
        this._currentBook = book;
    }

}
