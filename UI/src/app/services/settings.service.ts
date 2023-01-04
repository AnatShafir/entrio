import { Injectable } from '@angular/core';
import { Settings } from '../interfaces/settings';
import { User } from '../interfaces/user';
import { CurrentUserService } from './current-user.service';
import { ErrorService } from './error.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private currentUser: CurrentUserService,
    private usersService: UsersService
  ) { }

  async update(settingsUpdate: Settings) {
    const currentUserSettings = this.currentUser.getSettings()  as Settings;
    const newSetting = { ...currentUserSettings, ...settingsUpdate };
    const isEqualSettings = this.settingsDeepEqual(newSetting, currentUserSettings);
    if (isEqualSettings) return;
    this.validateSettings(newSetting);
    await this.saveChanges(settingsUpdate);
  }

  async saveChanges(settingsUpdate: Settings) {
    const currentUser = this.currentUser.getUser() as User;
    await this.usersService.updateSettings(settingsUpdate);
    this.currentUser.setSettings({ ...currentUser.settings, ...settingsUpdate });
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
