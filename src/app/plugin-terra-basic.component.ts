import {
    Component,
    OnInit
} from '@angular/core';
import { BookDataService } from './view/book-data-service/book-data.service';

@Component({
    selector: 'plugin-terra-basic-app',
    template: require('./plugin-terra-basic.component.html'),
    styles:   [require('./plugin-terra-basic.component.scss')],
})
export class PluginTerraBasicComponent implements OnInit
{
    public constructor(private _bookDataService:BookDataService)
    {

    }

    public ngOnInit():void
    {
        this.initGlobalBookData();
    }

    private initGlobalBookData():void
    {
        this._bookDataService.setBookData();
    }

}
