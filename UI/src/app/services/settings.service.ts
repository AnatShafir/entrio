import { Injectable } from '@angular/core';
import { Settings } from '../interfaces/settings';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private errorService: ErrorService) { }

  settingsDeepEqual(firstSettings: Settings, secondSettings: Settings) {
    const equalLength = Object.keys(firstSettings).length === Object.keys(secondSettings).length;
    const equalValues = Object.keys(firstSettings).every((key: string) => 
      firstSettings[key as keyof Settings] === secondSettings[key as keyof Settings]);
    return equalLength && equalValues;
  }

  validateSettings(settings: Settings) {
    const sumOfSettings = Object.values(settings).reduce((a, b) => +(a + b).toFixed(2), 0);
    if (sumOfSettings === 1) return true;
    else {
      const message = `The user settings should sum up to 1 but instead sum up to ${sumOfSettings}`;
      this.errorService.openDialog(message);
      return false;
    }
  }
}
