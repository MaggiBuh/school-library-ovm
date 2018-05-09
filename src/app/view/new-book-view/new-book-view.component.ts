import {
    Component,
    OnInit
} from '@angular/core';
import { TerraSuggestionBoxValueInterface } from '@plentymarkets/terra-components';
import { AuthorsConfig } from '../data/authores.config';
import { StoragesConfig } from '../data/storages.config';
import { PublisherConfig } from '../data/publisher.config';
import { GenreConfig } from '../data/genre.config';

@Component({
    selector: 'new-book-view',
    template: require('./new-book-view.component.html'),
    styles:   [require('./new-book-view.component.scss')],
})
export class NewBookViewComponent implements OnInit
{

    private _authorValues:Array<TerraSuggestionBoxValueInterface> = [];
    private _publisherValues:Array<TerraSuggestionBoxValueInterface> = [];
    private _storageValues:Array<TerraSuggestionBoxValueInterface> = [];
    private _genreValues:Array<object> = [];
    private _selectedGenre:Array<object> = [];

    public constructor(private _authorsConfig:AuthorsConfig,
                       private _storagesConfig:StoragesConfig,
                       private _publisherConfig:PublisherConfig,
                       private _genreConfig:GenreConfig,)
    {
    }

    public ngOnInit():void
    {
        this.initSuggestionBoxes();
    }

    private initSuggestionBoxes():void
    {
        this._authorValues.push
        (
            {
                value:   '',
                caption: ''
            }
        );
        this._publisherValues.push
        (
            {
                value:   '',
                caption: ''
            }
        );
        this._storageValues.push
        (
            {
                value:   '',
                caption: ''
            }
        );

        this._authorsConfig.authores.forEach(((res:any) => {
            this._authorValues.push
            (
                {
                    value:   res.authorId,
                    caption: res.authorFirstName + ' ' + res.authorLastName
                }
            );
        }));

        this._storagesConfig.storages.forEach(((res:any) => {
            this._storageValues.push
            (
                {
                    value:   res.storageId,
                    caption: res.storageName + ' - ' + res.storageType
                }
            );
        }));

        this._publisherConfig.publishers.forEach(((res:any) => {
            this._publisherValues.push
            (
                {
                    value:   res.publisherId,
                    caption: res.publisherName + ' - ' + res.publisherOrderNumber
                }
            );
        }));

        this._genreConfig.genre.forEach(((res:any) => {
            this._selectedGenre.push({
                id:         res.genreId,
                isSelected: false
            });
            this._genreValues.push
            (
                {
                    id:   res.genreId,
                    name: res.genreName
                }
            );
        }));
    }

    public setSelectedClassForListElement(isSelected:boolean, genreId:string):void
    {
        !(isSelected) ? document.getElementById(genreId).classList.add('selected') :
            document.getElementById(genreId).classList.remove('selected');
    }

    private openAddGenreOverlay():void
    {
        //TODO
    }

}
