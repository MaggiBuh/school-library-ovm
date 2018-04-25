import {
    Component,
    OnInit
} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'user-register-view',
    template: require('./user-register-view.component.html'),
    styles:   [require('./user-register-view.component.scss')],
})
export class UserRegisterViewComponent implements OnInit
{

    private _header:any = new Headers();
    private _userData:Array<any> = [];

    public constructor(private _http:Http,
                       private _router:Router)
    {

    }

    public ngOnInit():void
    {
    }

    public validateAndSave(userData:Array<any>):void
    {
        let url:string = 'assets/php/registration/registerNewUser.php';
        this._http.post(
            url,
            {
                userName:  userData['userName'],
                lastName:  userData['lastName'],
                firstName: userData['firstName'],
                email:     userData['email'],
                role:      1,
                userClass: userData['class'],
                password:  userData['password'],
            },
            {headers: this._header}
        ).subscribe(() => {
            this._router.navigateByUrl('/home');
        });
    }
}