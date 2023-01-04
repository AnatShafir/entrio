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
    private errorService: ErrorService,
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
    try {
      const currentUser = this.currentUser.getUser() as User;
      await this.usersService.updateSettings(settingsUpdate, currentUser);
      this.currentUser.setSettings({ ...currentUser.settings, ...settingsUpdate });
    } catch (error: Error | any) {
      const message = error?.error.message === 'Forbidden' ? 'Sorry! This user is not permitted to this update' : '';
      this.errorService.openDialog(message);
    };
  }

  settingsDeepEqual(firstSettings: Settings, secondSettings: Settings) {
    const equalLength = Object.keys(firstSettings).length === Object.keys(secondSettings).length;
    const equalValues = Object.keys(firstSettings).every((key: string) => 
      firstSettings[key as keyof Settings] === secondSettings[key as keyof Settings]);
    return equalLength && equalValues;
  }

  validateSettings(settings: Settings) {
    const sumOfSettings = Object.values(settings).reduce((a, b) => +(a + b).toFixed(2), 0);
    if (sumOfSettings === 1) return;
    else throw {
      error: new Error('Validation'),
      sumOfSettings
    };
  }
}
