import { Injectable } from '@angular/core';
import { Settings } from '../interfaces/settings';
import { CurrentUserService } from './current-user.service';
import { DefaultSettingsService } from './default-settings.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private currentUser: CurrentUserService,
    private usersService: UsersService,
    private defaultSettings: DefaultSettingsService
  ) { }

  async update(settingsUpdate: Settings, currentSettings: Settings, isDefault: boolean) {
    const newSettings = { ...currentSettings, ...settingsUpdate };
    const isEqualSettings = this.settingsDeepEqual(newSettings, currentSettings);
    if (isEqualSettings) return;
    this.validateSettings(newSettings);
    await this.saveChanges(settingsUpdate, newSettings, isDefault);
    return newSettings;
  }
  
  async saveChanges(settingsUpdate: Settings, newSettings: Settings, isDefault: boolean) {
    if (isDefault) await this.defaultSettings.update(settingsUpdate);
    else {
      await this.usersService.updateSettings(settingsUpdate);
      this.currentUser.setSettings(newSettings);
    }
  }

  settingsDeepEqual(firstSettings: Settings, secondSettings: Settings) {
    const equalLength = Object.keys(firstSettings).length === Object.keys(secondSettings).length;
    const equalValues = Object.keys(firstSettings).every((key: string) => 
      firstSettings[key as keyof Settings] === secondSettings[key as keyof Settings]);
    return equalLength && equalValues;
  }

  validateSettings(settings: Settings) {
    const sumOfSettings = Object.values(settings)
      .reduce((a: number, b: number) => Number((a + b).toFixed(2)), 0);
    if (sumOfSettings === 1) return;
    else throw {
      error: new Error('Validation'),
      sumOfSettings
    };
  }
}
