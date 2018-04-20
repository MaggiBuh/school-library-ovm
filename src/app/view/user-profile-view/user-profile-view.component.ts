import {
    Component,
    OnInit
} from '@angular/core';
import { DataStorageConfig } from '../data/data-storage.config';

@Component({
    selector: 'user-profile-view',
    template: require('./user-profile-view.component.html'),
    styles:   [require('./user-profile-view.component.scss')],
})
export class UserProfileViewComponent implements OnInit
{

    private _currentUser:Array<any> = [];

    public constructor(private _storageConfig:DataStorageConfig)
    {
    }

    public ngOnInit():void
    {
        this._currentUser = this._storageConfig.storage;
    }

}
