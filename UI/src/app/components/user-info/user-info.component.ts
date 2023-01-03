import { Component, Input, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { UsersService } from 'src/app/services/users/users.service'
import { Settings } from 'src/app/interfaces/settings';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  @Input() user?: User;
  isDisabled: boolean = true;

  constructor(public dialog: MatDialog, private usersService: UsersService) {}
  
  ngOnChanges(changes: SimpleChanges) {
    this.user = changes['user'].currentValue;
  }
  
  editMode(form?: NgForm) {
    this.isDisabled = !this.isDisabled;
    if (form) form.resetForm(this.user?.settings);
  }
  
  async onSaveChanges(form: NgForm) {
    const { value: formValue }: { value: Record<string, string> } = form;
    const settingsUpdate: Settings = this.getSettingsFromFormValue(formValue);
    const newSetting = { ...this.user?.settings, ...settingsUpdate };
    if (this.settingsDeepEqual(newSetting, this.user!.settings)) {
      this.editMode();
      return;
    }

    const sumOfSettings = Object.values(newSetting).reduce((a, b) => +(a + b).toFixed(2), 0);
    if (sumOfSettings === 1) await this.updateUserSettings(settingsUpdate);
    else {
      const message = `The user settings should sum up to 1 but instead sum up to ${sumOfSettings}`;
      this.openErrorDialog(message);
    }
  }

  getSettingsFromFormValue(formValue: Record<string, string>) {
    return Object.keys(formValue).reduce((settingsObj, settingKey) => {
      settingsObj[settingKey as keyof Settings] = +parseFloat(formValue[settingKey]).toFixed(2);
      return settingsObj;
    }, {} as Settings);
  }

  settingsDeepEqual(firstSettings: Settings, secondSettings: Settings) {
    const equalLength = Object.keys(firstSettings).length === Object.keys(secondSettings).length;
    const equalValues = Object.keys(firstSettings).every((key: string) => 
      firstSettings[key as keyof Settings] === secondSettings[key as keyof Settings]);
    return equalLength && equalValues;
  }
  
  async updateUserSettings(settingsUpdate: Settings) {
    const response = await this.usersService.updateSettings(settingsUpdate, this.user!);
    if (response instanceof HttpErrorResponse) {
      const { message } = response.error;
      let displayMessage;
      if (message === 'Forbidden') displayMessage = 'Sorry! This user is not permitted to this update';
      else displayMessage = `Please try again later. error: ${message}`
      this.openErrorDialog(displayMessage);
    } else {
      this.user!.settings = { ...this.user?.settings, ...settingsUpdate };
      this.editMode()
    }
  }
  
  openErrorDialog(message: string) {
    const data = { message, origin: 'updating setting changes' };
    this.dialog.open(ErrorDialogComponent, { data });
  }
}
