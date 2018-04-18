import {
    Component,
    OnInit
} from '@angular/core';

@Component({
    selector: 'user-login-view',
    template: require('./user-login-view.component.html'),
    styles:   [require('./user-login-view.component.scss')],
})
export class UserLoginViewComponent implements OnInit
{
    public constructor()
    {
    }

    public ngOnInit():void
    {

    }

}
