import { Component } from '@angular/core';

@Component({
    selector: 'user-register-view',
    template: require('./user-register-view.component.html'),
    styles:   [require('./user-register-view.component.scss')],
})
export class UserRegisterViewComponent
{
    public constructor()
    {

    }

    public validateAndSafe():void
    {
        console.log('test');
    }

}