import {
    APP_INITIALIZER,
    NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StartPageComponent } from './startpage';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app/terra-components.module';
import { HttpModule } from '@angular/http';
import { TranslationModule } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { LocalizationConfig } from './core/localization/terra-localization.config';
import { UserDataService } from './profile-view/service/userData.service';

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        FormsModule,
        TranslationModule.forRoot(),
        TerraComponentsModule.forRoot(),
    ],
    declarations: [
        StartPageComponent
    ],
    providers:    [
        UserDataService,
        LocalizationConfig,
        {
            provide:    APP_INITIALIZER,
            useFactory: initLocalization,
            deps:       [LocalizationConfig],
            multi:      true
        }
    ],
    bootstrap:    [
        StartPageComponent
    ]
})
export class PluginTerraBasicModule
{
}

export function initLocalization(localizationConfig:LocalizationConfig):Function
{
    return () => localizationConfig.load();
}
