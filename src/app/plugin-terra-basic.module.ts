import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PluginTerraBasicComponent } from './plugin-terra-basic.component';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app/terra-components.module';
import {
    L10nLoader,
    TranslationModule
} from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { BookListViewComponent } from './view/book-list-view/book-list-view.component';
import { UserLoginViewComponent } from './view/user-login-view/user-login-view.component';
import { UserRegisterViewComponent } from './view/user-login-view/user-register-view/user-register-view.component';
import {
    RouterModule,
    Routes
} from '@angular/router';
import { PhpConnectionHelper } from './view/php-connection-helper/php-connection-helper';
import { UserProfileViewComponent } from './view/user-profile-view/user-profile-view.component';
import { DataStorageConfig } from './view/data/data-storage.config';
import { NewBookViewComponent } from './view/new-book-view/new-book-view.component';
import { BookDataService } from './view/book-data-service/book-data.service';
import { AuthorsConfig } from './view/data/authores.config';
import { PublisherConfig } from './view/data/publisher.config';
import { StoragesConfig } from './view/data/storages.config';
import { GenreConfig } from './view/data/genre.config';
import { HttpClientModule } from '@angular/common/http';
import { l10nConfig } from './core/localization/l10n.config';

const appRoutes:Routes = [
    {
        path:      'registrierung',
        component: UserRegisterViewComponent
    },
    {
        path:      'profile',
        component: UserProfileViewComponent
    },
    {
        path:      'home',
        component: BookListViewComponent
    },
    {
        path:      'new-book',
        component: NewBookViewComponent
    },
    {
        path:       '',
        redirectTo: '/home',
        pathMatch:  'full'
    },
];

@NgModule({
    imports:      [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        TranslationModule.forRoot(l10nConfig),
        TerraComponentsModule.forRoot(),
        RouterModule.forRoot(
            appRoutes
        )
    ],
    declarations: [
        PluginTerraBasicComponent,
        BookListViewComponent,
        UserLoginViewComponent,
        UserRegisterViewComponent,
        UserProfileViewComponent,
        NewBookViewComponent
    ],
    providers:    [
        BookDataService,
        GenreConfig,
        AuthorsConfig,
        PublisherConfig,
        StoragesConfig,
        DataStorageConfig,
        PhpConnectionHelper,
    ],
    bootstrap:    [
        PluginTerraBasicComponent
    ]
})
export class PluginTerraBasicModule
{
    constructor(public l10nLoader:L10nLoader)
    {
        this.l10nLoader.load();
    }
}
