import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PhpConnectionHelper } from '../php-connection-helper/php-connection-helper';
import { AuthorsConfig } from '../data/authores.config';
import { PublisherConfig } from '../data/publisher.config';
import { StoragesConfig } from '../data/storages.config';
import { GenreConfig } from '../data/genre.config';
import { OwnersConfig } from '../data/owners.config';

@Injectable()
export class BookDataService
{
    public constructor(private _phpConnectionHelper:PhpConnectionHelper,
                       private _authorsConfig:AuthorsConfig,
                       private _publisherConfig:PublisherConfig,
                       private _storagesConfig:StoragesConfig,
                       private _genreConfig:GenreConfig,
                       private _ownersConfig:OwnersConfig)
    {
    }

    public setBookData():void
    {
        this._authorsConfig.authores = [];
        this._publisherConfig.publishers = [];
        this._storagesConfig.storages = [];
        this._genreConfig.genre = [];
        this._ownersConfig.owners = [];

        Observable.combineLatest(
            this._phpConnectionHelper.getAllAuthors(),
            this._phpConnectionHelper.getAllPublishers(),
            this._phpConnectionHelper.getAllStorages(),
            this._phpConnectionHelper.getAllGenre(),
            this._phpConnectionHelper.getAllOwners(),
            (authors:any, publishers:any, storages:any, genre:any, owners:any) => {
                return {
                    authors:    authors.json(),
                    publishers: publishers.json(),
                    storages:   storages.json(),
                    genre:      genre.json(),
                    owners:     owners.json(),
                };
            }
        ).subscribe((data:any) => {
            for(let key in data.authors)
            {
                this._authorsConfig.authores.push
                (
                    {
                        authorId:        data.authors[key].id,
                        authorFirstName: data.authors[key].firstname,
                        authorLastName:  data.authors[key].lastname,
                        authorEmail:     data.authors[key].email,
                        authorWebsite:   data.authors[key].website
                    }
                );
            }
            for(let key in data.publishers)
            {
                this._publisherConfig.publishers.push
                (
                    {
                        publisherId:            data.publishers[key].publisher_id,
                        publisherName:          data.publishers[key].name,
                        publisherEmail:         data.publishers[key].email,
                        publisherWebsite:       data.publishers[key].website,
                        publisherPhoneNumber:   data.publishers[key].phonenumber,
                        publisherOrderNumberId: data.publishers[key].ordernumber_id,
                        publisherOrderNumber:   data.publishers[key].number
                    }
                );
            }
            for(let key in data.storages)
            {
                this._storagesConfig.storages.push
                (
                    {
                        storageId:   data.storages[key].id,
                        storageName: data.storages[key].name,
                        storageType: data.storages[key].type
                    }
                );
            }
            for(let key in data.genre)
            {
                this._genreConfig.genre.push
                (
                    {
                        genreId:   data.genre[key].id,
                        genreName: data.genre[key].name,
                    }
                );
            }
            for(let key in data.owners)
            {
                this._ownersConfig.owners.push
                (
                    {
                        ownerId:        data.owners[key].id,
                        ownerFirstName: data.owners[key].firstname,
                        ownerLastName:  data.owners[key].lastname,
                        ownerCompany:   data.owners[key].company,
                    }
                );
            }
        });
    }
}
