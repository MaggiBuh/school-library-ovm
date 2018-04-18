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

const appRoutes:Routes = [
    {
        path:      'login',
        component: UserLoginViewComponent
    },
    {
        path:       '',
        redirectTo: 'login',
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
        UserRegisterViewComponent
    ],
    providers:    [
        LocalizationConfig,
        {
            provide:    APP_INITIALIZER,
            useFactory: initLocalization,
            deps:       [LocalizationConfig],
            multi:      true
        }
    ],
    bootstrap:    [
        PluginTerraBasicComponent,
        BookListViewComponent,
        UserLoginViewComponent
    ]
})
export class PluginTerraBasicModule
{
}

export function initLocalization(localizationConfig:LocalizationConfig):Function
{
    return () => localizationConfig.load();
}
