import {
    Component,
    OnInit
} from '@angular/core';
import { TerraSuggestionBoxValueInterface } from '@plentymarkets/terra-components';
import { AuthorsConfig } from '../data/authores.config';
import { StoragesConfig } from '../data/storages.config';
import { PublisherConfig } from '../data/publisher.config';
import { GenreConfig } from '../data/genre.config';
import { OwnersConfig } from '../data/owners.config';

@Component({
    selector: 'new-book-view',
    template: require('./new-book-view.component.html'),
    styles:   [require('./new-book-view.component.scss')],
})
export class NewBookViewComponent implements OnInit
{

    public authorValues:Array<TerraSuggestionBoxValueInterface> = [];
    public publisherValues:Array<TerraSuggestionBoxValueInterface> = [];
    public storageValues:Array<TerraSuggestionBoxValueInterface> = [];
    public ownerValues:Array<TerraSuggestionBoxValueInterface> = [];
    public genreValues:Array<object> = [];
    public selectedGenre:Array<object> = [];

    public constructor(private _authorsConfig:AuthorsConfig,
                       private _storagesConfig:StoragesConfig,
                       private _publisherConfig:PublisherConfig,
                       private _genreConfig:GenreConfig,
                       private _ownersConfig:OwnersConfig)
    {
    }

    public ngOnInit():void
    {
        this.initSuggestionBoxes();
    }

    private initSuggestionBoxes():void
    {
        this.authorValues.push
        (
            {
                value:   '',
                caption: ''
            }
        );
        this.publisherValues.push
        (
            {
                value:   '',
                caption: ''
            }
        );
        this.storageValues.push
        (
            {
                value:   '',
                caption: ''
            }
        );
        this.ownerValues.push
        (
            {
                value:   '',
                caption: ''
            }
        );

        this._authorsConfig.authores.forEach(((res:any) => {
            this.authorValues.push
            (
                {
                    value:   res.authorId,
                    caption: res.authorFirstName + ' ' + res.authorLastName
                }
            );
        }));

        this._storagesConfig.storages.forEach(((res:any) => {
            this.storageValues.push
            (
                {
                    value:   res.storageId,
                    caption: res.storageName + ' - ' + res.storageType
                }
            );
        }));

        this._publisherConfig.publishers.forEach(((res:any) => {
            this.publisherValues.push
            (
                {
                    value:   res.publisherId,
                    caption: res.publisherName + ' - ' + res.publisherOrderNumber
                }
            );
        }));

        this._genreConfig.genre.forEach(((res:any) => {
            this.selectedGenre.push({
                id:         res.genreId,
                isSelected: false
            });
            this.genreValues.push
            (
                {
                    id:   res.genreId,
                    name: res.genreName
                }
            );
        }));

        this._ownersConfig.owners.forEach(((res:any) => {
            this.ownerValues.push
            (
                {
                    value:   res.ownerId,
                    caption: res.ownerCompany ? res.ownerCompany : res.ownerFirstName + ' ' + res.ownerLastName
                }
            );
        }));
    }

    private openAddGenreOverlay():void
    {
        //TODO
    }

}
