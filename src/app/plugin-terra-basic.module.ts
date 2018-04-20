import {
    APP_INITIALIZER,
    NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PluginTerraBasicComponent } from './plugin-terra-basic.component';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app/terra-components.module';
import { HttpModule } from '@angular/http';
import { TranslationModule } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { LocalizationConfig } from './core/localization/terra-localization.config';
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
        path:       '',
        redirectTo: '/home',
        pathMatch:  'full'
    },
];

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        FormsModule,
        TranslationModule.forRoot(),
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
        UserProfileViewComponent
    ],
    providers:    [
        DataStorageConfig,
        PhpConnectionHelper,
        LocalizationConfig,
        {
            provide:    APP_INITIALIZER,
            useFactory: initLocalization,
            deps:       [LocalizationConfig],
            multi:      true
        }
    ],
    bootstrap:    [
        PluginTerraBasicComponent
    ]
})
export class PluginTerraBasicModule
{
}

export function initLocalization(localizationConfig:LocalizationConfig):Function
{
    return () => localizationConfig.load();
}
