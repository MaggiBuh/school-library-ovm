import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { DataStorageConfig } from '../data/data-storage.config';
import {
    TerraAlertComponent,
    TerraOverlayButtonInterface,
    TerraOverlayComponent
} from '@plentymarkets/terra-components';
import { Router } from '@angular/router';

@Component({
    selector: 'user-profile-view',
    template: require('./user-profile-view.component.html'),
    styles:   [require('./user-profile-view.component.scss')],
})
export class UserProfileViewComponent implements OnInit
{

    @ViewChild('viewChildOverlayProfileSettings') public viewChildOverlayProfileSettings:TerraOverlayComponent;

    private _currentUser:Array<any> = [];
    private _validateAndSaveProfileData:TerraOverlayButtonInterface;
    private _alert:TerraAlertComponent = TerraAlertComponent.getInstance();

    public constructor(private _storageConfig:DataStorageConfig,
                       private _router:Router)
    {
    }

    public ngOnInit():void
    {
        this._alert.closeAlertByIdentifier('alert');
        this._validateAndSaveProfileData = {
            icon:          'fas fa-plus',
            caption:       'Save',
            isDisabled:    false,
            clickFunction: ():void => this.validateAndSaveProfileData(this.viewChildOverlayProfileSettings)
        };

        this._currentUser = this._storageConfig.storage;
    }

    public openOverlay(overlay:TerraOverlayComponent):void
    {
        overlay.showOverlay();
    }

    public openNewBookView():void
    {
        this._router.navigateByUrl('new-book');
    }

    public checkIfCurrentUserHasAdminRole():boolean
    {
        return this._currentUser['role'] == 1;
    }

    private validateAndSaveProfileData(overlay:TerraOverlayComponent):void
    {
        this._alert.addAlert({
            msg:              'Successfully saved!',
            type:             'success',
            dismissOnTimeout: 2000,
            identifier:       'alert'
        });
        overlay.hideOverlay();
    }

}
