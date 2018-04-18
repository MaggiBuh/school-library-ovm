import {
    Component,
    OnInit
} from '@angular/core';
import { PhpConnectionHelper } from '../php-connection-helper/php-connection-helper';
import { isNullOrUndefined } from 'util';
import { TerraButtonInterface } from '@plentymarkets/terra-components';

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
    private _loggedIn:boolean = false;
    private _buttonOptionList:Array<TerraButtonInterface> = [];

    public constructor(private _phpConnectionHelper:PhpConnectionHelper)
    {
    }

    public ngOnInit():void
    {
        this._buttonOptionList.push({
            caption:       'Profile',
            icon:          'icon-user_my_account',
            clickFunction: ():void =>
                           {
                           }
        });
        this._buttonOptionList.push({
            caption:       'Logout',
            icon:          'icon-user_my_account',
            clickFunction: ():void =>
                           {
                           }
        });
    }

    public validateDataAndLogin(userName:string, password:string):void
    {
        if(!isNullOrUndefined(userName) && userName !== '' &&
           !isNullOrUndefined(password) && password !== '')
        {
            this._phpConnectionHelper.loginWithExistingAccount(userName, password).subscribe((res) =>
            {
                let userData = res.json();
                if(userData['error'] !== true)
                {
                    this._loggedIn = true;
                    this._currentUser = {
                            userId:    userData['id'],
                            userName:  userData['username'],
                            firstName: userData['firstname'],
                            lastName:  userData['lastname'],
                            email:     userData['email'],
                            userClass: userData['class'],
                            userRole:  userData['role'],
                        };
                }
                else
                {
                    console.log(userData['error_message']);
                }
            });
        }
        else
        {
            console.log('Felder müssen ausgefüllt sein!');
        }
    }

}
