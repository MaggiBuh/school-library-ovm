import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import {
    TerraOverlayButtonInterface,
    TerraOverlayComponent,
    TerraSuggestionBoxValueInterface
} from '@plentymarkets/terra-components';
import { AuthorsConfig } from '../data/authores.config';
import { StoragesConfig } from '../data/storages.config';
import { PublisherConfig } from '../data/publisher.config';
import { GenreConfig } from '../data/genre.config';
import { OwnersConfig } from '../data/owners.config';
import { PhpConnectionHelper } from '../php-connection-helper/php-connection-helper';
import { OwnerInterface } from './interface/owner.interface';
import { AuthorInterface } from './interface/author.interface';
import { StorageInterface } from './interface/storage.interface';
import { PublisherInterface } from './interface/publisher.interface';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'new-book-view',
    template: require('./new-book-view.component.html'),
    styles:   [require('./new-book-view.component.scss')],
})
export class NewBookViewComponent implements OnInit
{

    @ViewChild('newAuthorOverlay') public newAuthorOverlay:TerraOverlayComponent;
    @ViewChild('newPublisherOverlay') public newPublisherOverlay:TerraOverlayComponent;
    @ViewChild('newStorageOverlay') public newStorageOverlay:TerraOverlayComponent;
    @ViewChild('newOwnerOverlay') public newOwnerOverlay:TerraOverlayComponent;
    @ViewChild('newGenreOverlay') public newGenreOverlay:TerraOverlayComponent;

    public authorValues:Array<TerraSuggestionBoxValueInterface> = [];
    public publisherValues:Array<TerraSuggestionBoxValueInterface> = [];
    public storageValues:Array<TerraSuggestionBoxValueInterface> = [];
    public ownerValues:Array<TerraSuggestionBoxValueInterface> = [];
    public genreValues:Array<object> = [];
    public genreOverlayButton:TerraOverlayButtonInterface;
    public ownerOverlayButton:TerraOverlayButtonInterface;
    public storageOverlayButton:TerraOverlayButtonInterface;
    public authorOverlayButton:TerraOverlayButtonInterface;
    public publisherOverlayButton:TerraOverlayButtonInterface;
    public newGenreData:string;
    public newOwnerData:OwnerInterface;
    public newAuthorData:AuthorInterface;
    public newStorageData:StorageInterface;
    public newPublisherData:PublisherInterface;
    public selectedGenre:Array<object> = [];

    public constructor(private _authorsConfig:AuthorsConfig,
                       private _storagesConfig:StoragesConfig,
                       private _publisherConfig:PublisherConfig,
                       private _genreConfig:GenreConfig,
                       private _ownersConfig:OwnersConfig,
                       private _phpConnectionHelper:PhpConnectionHelper)
    {
    }

    public ngOnInit():void
    {
        this.newOwnerData = {
            company:   '',
            firstName: '',
            lastName:  ''
        };
        this.newAuthorData = {
            lastName:  '',
            firstName: '',
            email:     '',
            website:   '',
        };
        this.newStorageData = {
            name: '',
            type: '',
        };
        this.newPublisherData = {
            name:        '',
            website:     '',
            email:       '',
            phoneNumber: '',
            orderNumber: ''
        };
        this.initOptionButtons();
        this.initSuggestionBoxes();
    }

    public checkIfInputIsEmpty(value:string):boolean
    {
        return value === '';
    }

    public openAddAuthorOverlay():void
    {
        this.newAuthorOverlay.showOverlay();
    }

    public openAddGenreOverlay():void
    {
        this.newGenreOverlay.showOverlay();
    }

    public openAddOwnerOverlay():void
    {
        this.newOwnerOverlay.showOverlay();
    }

    public openAddStorageOverlay():void
    {
        this.newStorageOverlay.showOverlay();
    }

    public openAddPublisherOverlay():void
    {
        this.newPublisherOverlay.showOverlay();
    }

    public validateAndSaveNewAuthorData(authorData:AuthorInterface):void
    {
        let checkIfInputIsEmpty:boolean = false;

        if(this.checkIfInputIsEmpty(authorData.email) && this.checkIfInputIsEmpty(authorData.firstName) &&
           this.checkIfInputIsEmpty(authorData.lastName) && this.checkIfInputIsEmpty(authorData.website))
        {
            checkIfInputIsEmpty = true;
        }

        if(!checkIfInputIsEmpty)
        {
            let checkIfAuthorAlreadyExists:boolean = false;
            this._authorsConfig.authores.forEach((author:any) => {

                if(authorData.firstName.toLowerCase() === author.authorFirstName.toLowerCase() &&
                   authorData.lastName.toLowerCase() === author.authorLastName.toLowerCase())
                {
                    checkIfAuthorAlreadyExists = true;
                }
            });

            if(!checkIfAuthorAlreadyExists)
            {
                this._phpConnectionHelper.insertNewAuthor(authorData).subscribe((res:any) => {
                    let authorId:number = res.json();
                    this.authorValues.push(
                        {
                            value:   authorId,
                            caption: authorData.firstName + ' ' + authorData.lastName
                        }
                    );
                    this._authorsConfig.authores.push
                    (
                        {
                            authorId:        authorId,
                            authorFirstName: authorData.firstName,
                            authorLastName:  authorData.lastName,
                            authorEmail:     authorData.email,
                            authorWebsite:   authorData.website
                        }
                    );
                    this.newAuthorOverlay.hideOverlay();
                });
            }
            else
            {
                console.log('already exists');
            }
        }
        else
        {
            console.log('inputs leer!');
        }
    }

    public validateAndSaveNewOwnerData(ownerData:OwnerInterface):void
    {
        let checkIfInputIsEmpty:boolean = false;

        if(this.checkIfInputIsEmpty(ownerData.company) &&
           (this.checkIfInputIsEmpty(ownerData.firstName) || this.checkIfInputIsEmpty(ownerData.lastName)))
        {
            checkIfInputIsEmpty = true;
        }

        if(!checkIfInputIsEmpty)
        {
            let checkIfOwnerAlreadyExists:boolean = false;
            this._ownersConfig.owners.forEach((owner:any) => {

                if(!this.checkIfInputIsEmpty(ownerData.company))
                {
                    if(ownerData.company.toLowerCase() === owner.ownerCompany.toLowerCase())
                    {
                        checkIfOwnerAlreadyExists = true;
                    }
                }
                else
                {
                    if(!this.checkIfInputIsEmpty(ownerData.firstName) && !this.checkIfInputIsEmpty(ownerData.lastName))
                    {
                        if(ownerData.firstName.toLowerCase() === owner.ownerFirstName.toLowerCase() &&
                           ownerData.lastName.toLowerCase() === owner.ownerLastName.toLowerCase())
                        {
                            checkIfOwnerAlreadyExists = true;
                        }
                    }
                }
            });

            if(!checkIfOwnerAlreadyExists)
            {
                this._phpConnectionHelper.insertNewOwner(ownerData).subscribe((res:any) => {
                    let ownerId:number = res.json();
                    this.ownerValues.push
                    (
                        {
                            value:   ownerId,
                            caption: ownerData.company ? ownerData.company : ownerData.firstName + ' ' + ownerData.lastName
                        }
                    );
                    this._ownersConfig.owners.push(
                        {
                            ownerCompany:   ownerData.company,
                            ownerFirstName: ownerData.firstName,
                            ownerLastName:  ownerData.lastName
                        }
                    );
                    this.newOwnerOverlay.hideOverlay();
                });
            }
            else
            {
                console.log('already exists');
            }
        }
        else
        {
            console.log('inputs leer!');
        }
    }

    public validateAndSaveNewStorageData(storageData:StorageInterface):void
    {
        let checkIfInputIsEmpty:boolean = false;

        if(this.checkIfInputIsEmpty(storageData.name) && this.checkIfInputIsEmpty(storageData.type))
        {
            checkIfInputIsEmpty = true;
        }

        if(!checkIfInputIsEmpty)
        {
            let checkIfStorageAlreadyExists:boolean = false;
            this._storagesConfig.storages.forEach((storage:any) => {

                if(storageData.name.toLowerCase() === storage.storageName.toLowerCase() &&
                   storageData.type.toLowerCase() === storage.storageType.toLowerCase())
                {
                    checkIfStorageAlreadyExists = true;
                }
            });

            if(!checkIfStorageAlreadyExists)
            {
                this._phpConnectionHelper.insertNewStorage(storageData).subscribe((res:any) => {
                    let storageId:number = res.json();
                    this.authorValues.push
                    (
                        {
                            value:   storageId,
                            caption: storageData.name + ' - ' + storageData.type
                        }
                    );
                    this._storagesConfig.storages.push
                    (
                        {
                            storageId:   storageId,
                            storageName: storageData.name,
                            storageType: storageData.type
                        }
                    );
                    this.newStorageOverlay.hideOverlay();
                });
            }
            else
            {
                console.log('already exists');
            }
        }
        else
        {
            console.log('inputs leer!');
        }
    }

    public validateAndSaveNewGenreData(name:string):void
    {
        let checkIfGenreAlreadyExists:boolean = false;
        this.genreValues.forEach((genre:any) => {
            if(name.toLowerCase() === genre.name.toLowerCase())
            {
                checkIfGenreAlreadyExists = true;
            }
        });
        if(!checkIfGenreAlreadyExists)
        {
            this._phpConnectionHelper.insertNewGenre(name).subscribe((res:any) => {
                let genreId:number = res.json();
                this.selectedGenre.push(
                    {
                        id:         genreId,
                        isSelected: false
                    }
                );
                this.genreValues.push
                (
                    {
                        id:   genreId,
                        name: name
                    }
                );
                this._genreConfig.genre.push
                (
                    {
                        genreId:   genreId,
                        genreName: name
                    }
                );
                this.newGenreOverlay.hideOverlay();
            });
        }
        else
        {
            console.log('already exists');
        }

    }

    public validateAndSaveNewPublisherData(publisherData:PublisherInterface):void
    {
        let checkIfInputIsEmpty:boolean = false;

        if(this.checkIfInputIsEmpty(publisherData.name) && this.checkIfInputIsEmpty(publisherData.website) &&
           this.checkIfInputIsEmpty(publisherData.email) && this.checkIfInputIsEmpty(publisherData.phoneNumber) &&
           this.checkIfInputIsEmpty(publisherData.orderNumber))
        {
            checkIfInputIsEmpty = true;
        }

        if(!checkIfInputIsEmpty)
        {
            let checkIfStorageAlreadyExists:boolean = false;
            this._publisherConfig.publishers.forEach((publisher:any) => {

                if(publisherData.name.toLowerCase() === publisher.publisherName.toLowerCase())
                {
                    checkIfStorageAlreadyExists = true;
                }
            });

            if(!checkIfStorageAlreadyExists)
            {
                this._phpConnectionHelper.insertNewPublisher(publisherData).subscribe((res:any) => {
                    let publisherId:number = res.json();
                    this.publisherValues.push
                    (
                        {
                            value:   publisherId,
                            caption: publisherData.name + ' - ' + publisherData.orderNumber
                        }
                    );
                    this.newPublisherOverlay.hideOverlay();
                });
            }
            else
            {
                console.log('already exists');
            }
        }
        else
        {
            console.log('inputs leer!');
        }
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

        if(!isNullOrUndefined(this._authorsConfig.authores) && this._authorsConfig.authores.length > 0)
        {
            this._authorsConfig.authores.forEach(((res:any) => {
                this.authorValues.push
                (
                    {
                        value:   res.authorId,
                        caption: res.authorFirstName + ' ' + res.authorLastName
                    }
                );
            }));
        }
        if(!isNullOrUndefined(this._storagesConfig.storages) && this._storagesConfig.storages.length > 0)
        {
            this._storagesConfig.storages.forEach(((res:any) => {
                this.storageValues.push
                (
                    {
                        value:   res.storageId,
                        caption: res.storageName + ' - ' + res.storageType
                    }
                );
            }));
        }
        if(!isNullOrUndefined(this._publisherConfig.publishers) && this._publisherConfig.publishers.length > 0)
        {
            this._publisherConfig.publishers.forEach(((res:any) => {
                this.publisherValues.push
                (
                    {
                        value:   res.publisherId,
                        caption: res.publisherName + ' - ' + res.publisherOrderNumber
                    }
                );
            }));
        }
        if(!isNullOrUndefined(this._genreConfig.genre) && this._genreConfig.genre.length > 0)
        {
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
        }
        if(!isNullOrUndefined(this._ownersConfig.owners) && this._ownersConfig.owners.length > 0)
        {
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
    }

    private initOptionButtons():void
    {
        this.genreOverlayButton = {
            caption:       'Save',
            clickFunction: ():void => this.validateAndSaveNewGenreData(this.newGenreData)
        };
        this.authorOverlayButton = {
            caption:       'Save',
            clickFunction: ():void => this.validateAndSaveNewAuthorData(this.newAuthorData)
        };
        this.ownerOverlayButton = {
            caption:       'Save',
            clickFunction: ():void => this.validateAndSaveNewOwnerData(this.newOwnerData)
        };
        this.storageOverlayButton = {
            caption:       'Save',
            clickFunction: ():void => this.validateAndSaveNewStorageData(this.newStorageData)
        };
        this.publisherOverlayButton = {
            caption:       'Save',
            clickFunction: ():void => this.validateAndSaveNewPublisherData(this.newPublisherData)
        };
    }

}
