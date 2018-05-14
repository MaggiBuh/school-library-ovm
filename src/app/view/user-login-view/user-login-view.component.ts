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
    public userName:string;
    public password:string;
    public loggedIn:boolean = false;
    private _currentUser:any;
    public buttonOptionList:Array<TerraButtonInterface> = [];

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
        this.buttonOptionList = [];
        this._router.navigateByUrl('/home');
    }

    private openProfileViewWithCurrentUserData(currentUser:Array<any>):void
    {
        this._storageConfig.storage = currentUser;
        this._router.navigate(['/profile']);
    }

    private changeCurrentTheme():void
    {
        let pageBody:HTMLCollectionOf<Element> = document.getElementsByClassName('dark-standard');
        if(pageBody[0].className.includes('unicorn'))
        {
            pageBody[0].classList.remove('unicorn');
        }
        else
        {
            pageBody[0].classList.add('unicorn');
        }
    }

    private initButtonListAfterLogin():void
    {
        let checkIfCurrentUserHasAdminRole:boolean = this._currentUser.role != 1;
        this.buttonOptionList.push(
            {
                caption:       'Profile',
                icon:          'fas fa-user-circle',
                clickFunction: ():void => this.openProfileViewWithCurrentUserData(this._currentUser)
            },
            {
                caption:       'New Book',
                icon:          'fas fa-plus-circle',
                isDisabled:    checkIfCurrentUserHasAdminRole,
                clickFunction: ():void => this.openNewBookView()
            },
            {
                caption:       'Change Theme',
                icon:          'fas fa-exchange-alt',
                clickFunction: ():void => this.changeCurrentTheme()
            },
            {
                caption:       'Logout',
                icon:          'fas fa-sign-out-alt',
                clickFunction: ():void => this.logoutCurrentUser()
            }
        );
    }

}
