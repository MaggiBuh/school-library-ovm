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

    public validateAndSaveNewAuthorData():void
    {
        //ToDo
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
                    this.newGenreOverlay.hideOverlay();
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

    public validateAndSaveNewStorageData():void
    {
        //ToDo
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

    public validateAndSaveNewPublisherData():void
    {
        //ToDo
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

    private initOptionButtons():void
    {
        this.genreOverlayButton = {
            caption:       'Save',
            clickFunction: ():void => this.validateAndSaveNewGenreData(this.newGenreData)
        };
        this.authorOverlayButton = {
            caption:       'Save',
            clickFunction: ():void => this.validateAndSaveNewAuthorData()
        };
        this.ownerOverlayButton = {
            caption:       'Save',
            clickFunction: ():void => this.validateAndSaveNewOwnerData(this.newOwnerData)
        };
        this.storageOverlayButton = {
            caption:       'Save',
            clickFunction: ():void => this.validateAndSaveNewStorageData()
        };
        this.publisherOverlayButton = {
            caption:       'Save',
            clickFunction: ():void => this.validateAndSaveNewPublisherData()
        };
    }

}
