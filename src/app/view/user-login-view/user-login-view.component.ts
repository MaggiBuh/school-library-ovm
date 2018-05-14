import {
    Component,
    OnInit
} from '@angular/core';
import { PhpConnectionHelper } from '../php-connection-helper/php-connection-helper';
import { isNullOrUndefined } from 'util';
import { TerraButtonInterface } from '@plentymarkets/terra-components';
import { Router } from '@angular/router';
import { DataStorageConfig } from '../data/data-storage.config';

@Component({
    selector: 'user-login-view',
    template: require('./user-login-view.component.html'),
    styles:   [require('./user-login-view.component.scss')],
})
export class UserLoginViewComponent implements OnInit
{
    private _userName:string;
    private _password:string;
    private _currentUser:any;
    public loggedIn:boolean = false;
    private _buttonOptionList:Array<TerraButtonInterface> = [];

    public constructor(private _phpConnectionHelper:PhpConnectionHelper,
                       private _router:Router,
                       private _storageConfig:DataStorageConfig)
    {
    }

    public ngOnInit():void
    {
    }

    public validateDataAndLogin(userName:string, password:string):void
    {
        if(!isNullOrUndefined(userName) && userName !== '' &&
           !isNullOrUndefined(password) && password !== '')
        {
            this._phpConnectionHelper.loginWithExistingAccount(userName, password).subscribe((res) => {
                this._currentUser = res.json();
                this.loggedIn = true;
                this.initButtonListAfterLogin();
            });
        }
        else
        {
            console.log('Felder müssen ausgefüllt sein!');
        }
    }

    public openNewBookView():void
    {
        this._router.navigate(['/new-book']);
    }

    private logoutCurrentUser():void
    {
        this.loggedIn = false;
        this._storageConfig.storage = [];
        this._currentUser = [];
        this._router.navigateByUrl('/home');
    }

    private openProfileViewWithCurrentUserData(currentUser:Array<any>):void
    {
        this._storageConfig.storage = currentUser;
        this._router.navigate(['/profile']);
    }

    private initButtonListAfterLogin():void
    {
        console.log(this._currentUser.role === 1);
        this._buttonOptionList.push({
            caption:       'Profile',
            icon:          'fas fa-user-circle',
            clickFunction: ():void => this.openProfileViewWithCurrentUserData(this._currentUser)
        });
        this._buttonOptionList.push({
            caption:       'New Book',
            icon:          'fas fa-plus-circle',
            isHidden:      this._currentUser.role === 1,
            clickFunction: ():void => this.openNewBookView()
        });
        this._buttonOptionList.push({
            caption:       'Logout',
            icon:          'fas fa-sign-out-alt',
            clickFunction: ():void => this.logoutCurrentUser()
        });
    }

}
